import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/data/repositories/ticket_repository_impl.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/repositories/ticket_repository_contract.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'ticket_list_provider.g.dart';

final ticketRepositoryProvider = Provider<TicketRepository>((ref) {
  return TicketRepositoryImpl();
});

class TicketFilterState {
  final String search;
  final TicketStatus? status;
  final bool isAssignedToMe;

  const TicketFilterState({
    this.search = '',
    this.status = TicketStatus.open,
    this.isAssignedToMe = true,
  });

  TicketFilterState copyWith({
    String? search,
    TicketStatus? status,
    bool? isAssignedToMe,
    bool clearStatus = false,
  }) {
    return TicketFilterState(
      search: search ?? this.search,
      status: clearStatus ? null : (status ?? this.status),
      isAssignedToMe: isAssignedToMe ?? this.isAssignedToMe,
    );
  }
}

class TicketFilterNotifier extends StateNotifier<TicketFilterState> {
  TicketFilterNotifier() : super(const TicketFilterState());

  void setSearch(String search) {
    state = state.copyWith(search: search);
  }

  void setStatus(TicketStatus? status) {
    state = state.copyWith(status: status, clearStatus: status == null);
  }

  void toggleAssignedToMe(bool isAssignedToMe) {
    state = state.copyWith(isAssignedToMe: isAssignedToMe);
  }
}

final ticketFilterProvider =
    StateNotifierProvider<TicketFilterNotifier, TicketFilterState>((ref) {
      return TicketFilterNotifier();
    });

@riverpod
class TicketList extends _$TicketList {
  int _currentPage = 1;
  bool _hasNextPage = true;
  bool _isFetchingMore = false;

  bool get hasNextPage => _hasNextPage;
  bool get isFetchingMore => _isFetchingMore;

  @override
  FutureOr<List<TicketEntity>> build() async {
    _currentPage = 1;
    _hasNextPage = true;
    _isFetchingMore = false;

    // Perhatikan: nama provider otomatis jadi lowercase (ticketFilterProvider)
    final filter = ref.watch(ticketFilterProvider);

    // Perbaikan: sesuaikan parameter dengan tipe TicketFilterState
    return await _fetchPage(page: 1, filter: filter);
  }

  Future<List<TicketEntity>> _fetchPage({
    required int page,
    required TicketFilterState filter,
  }) async {
    final user = ref.read(currentUserProvider);
    if (user == null) {
      _hasNextPage = false;
      return [];
    }

    final repository = ref.read(ticketRepositoryProvider);

    final creatorId = user.role.isUser ? user.id : null;
    final assigneeId = (!user.role.isUser && filter.isAssignedToMe)
        ? user.id
        : null;

    final result = await repository.getTickets(
      page: page,
      limit: 10,
      creatorId: creatorId,
      assigneeId: assigneeId,
      status: filter.status,
      search: filter.search.isNotEmpty ? filter.search : null,
    );

    _hasNextPage = result.meta.hasNextPage;
    return result.items;
  }

  Future<void> fetchMore() async {
    if (_isFetchingMore || !_hasNextPage || state.isLoading || state.hasError)
      return;

    _isFetchingMore = true;
    try {
      final filter = ref.read(ticketFilterProvider);
      // 1. Tentukan page tujuan dulu
      final nextPage = _currentPage + 1;

      final nextTickets = await _fetchPage(page: nextPage, filter: filter);

      // 2. Jika berhasil, baru update page dan state
      _currentPage = nextPage;

      final previousState = state.value ?? [];
      state = AsyncData([...previousState, ...nextTickets]);
    } catch (e) {
      print('Fetch more error: $e');
    } finally {
      _isFetchingMore = false;
    }
  }
}
