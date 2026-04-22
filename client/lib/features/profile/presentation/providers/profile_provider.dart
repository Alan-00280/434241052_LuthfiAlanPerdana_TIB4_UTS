import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/profile/data/repositories/profile_repository_impl.dart';
import 'package:helpdesk_ticketing/features/profile/domain/entities/profile_entity.dart';
import 'package:helpdesk_ticketing/features/profile/domain/repositories/profile_repository_contract.dart';

final profileRepositoryProvider = Provider<ProfileRepository>((ref) {
  return ProfileRepositoryImpl();
});

class ProfileState {
  final bool isLoading;
  final ProfileEntity? profile;
  final String? error;

  ProfileState({
    this.isLoading = false,
    this.profile,
    this.error,
  });

  ProfileState copyWith({
    bool? isLoading,
    ProfileEntity? profile,
    String? error,
  }) {
    return ProfileState(
      isLoading: isLoading ?? this.isLoading,
      profile: profile ?? this.profile,
      error: error ?? this.error,
    );
  }
}

class ProfileNotifier extends StateNotifier<ProfileState> {
  final ProfileRepository _repository;
  final String _userId;

  ProfileNotifier(this._repository, this._userId) : super(ProfileState()) {
    if (_userId.isNotEmpty) {
      fetchProfile();
    }
  }

  Future<void> fetchProfile() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      // get profile by userId (with supaId=true or false, we will default to false 
      // since the auth system uses the internal id mapped from Supabase)
      // wait, the API says "Mengambil detail user berdasarkan ID atau Supabase UID"
      // If we use currentUserProvider, it returns the user internal id.
      final profile = await _repository.getProfile(_userId);
      state = state.copyWith(isLoading: false, profile: profile);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> updateProfile({String? fullName, String? phone}) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final updatedProfile = await _repository.updateProfile(
        _userId,
        fullName: fullName,
        phone: phone,
      );
      state = state.copyWith(isLoading: false, profile: updatedProfile);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      rethrow;
    }
  }
}

final profileProvider = StateNotifierProvider<ProfileNotifier, ProfileState>((ref) {
  final user = ref.watch(currentUserProvider);
  return ProfileNotifier(
    ref.watch(profileRepositoryProvider), 
    user?.id ?? '',
  );
});
