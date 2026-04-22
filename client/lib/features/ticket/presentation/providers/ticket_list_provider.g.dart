// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ticket_list_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(TicketList)
final ticketListProvider = TicketListProvider._();

final class TicketListProvider
    extends $AsyncNotifierProvider<TicketList, List<TicketEntity>> {
  TicketListProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'ticketListProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$ticketListHash();

  @$internal
  @override
  TicketList create() => TicketList();
}

String _$ticketListHash() => r'a983897c0d3c619f3fb567d78e2ef2eace6e75cb';

abstract class _$TicketList extends $AsyncNotifier<List<TicketEntity>> {
  FutureOr<List<TicketEntity>> build();
  @$mustCallSuper
  @override
  void runBuild() {
    final ref =
        this.ref as $Ref<AsyncValue<List<TicketEntity>>, List<TicketEntity>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<TicketEntity>>, List<TicketEntity>>,
              AsyncValue<List<TicketEntity>>,
              Object?,
              Object?
            >;
    element.handleCreate(ref, build);
  }
}
