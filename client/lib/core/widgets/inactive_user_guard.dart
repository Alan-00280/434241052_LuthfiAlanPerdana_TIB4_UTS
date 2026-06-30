import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';

class InactiveUserGuard extends ConsumerStatefulWidget {
  final Widget child;

  const InactiveUserGuard({super.key, required this.child});

  @override
  ConsumerState<InactiveUserGuard> createState() => _InactiveUserGuardState();
}

class _InactiveUserGuardState extends ConsumerState<InactiveUserGuard> {
  Timer? _logoutTimer;
  int _secondsRemaining = 15;

  @override
  void dispose() {
    _logoutTimer?.cancel();
    super.dispose();
  }

  void _startTimer() {
    if (_logoutTimer != null) return;
    _secondsRemaining = 15;
    _logoutTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 1) {
        setState(() {
          _secondsRemaining--;
        });
      } else {
        _logoutTimer?.cancel();
        _forceLogout();
      }
    });
  }

  void _cancelTimer() {
    _logoutTimer?.cancel();
    _logoutTimer = null;
  }

  void _forceLogout() {
    _cancelTimer();
    ref.read(authControllerProvider.notifier).logout();
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(currentUserProvider);
    final isInactive = user != null && !user.isActive;

    if (isInactive) {
      _startTimer();

      return Stack(
        children: [
          // Original app state loads/runs in the background
          widget.child,
          // Blocking glass overlay that absorbs all gestures
          Positioned.fill(
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () {
                debugPrint('Interaction detected during warning, logging out immediately.');
                _forceLogout();
              },
              onPanDown: (_) {
                debugPrint('Gesture detected during warning, logging out immediately.');
                _forceLogout();
              },
              child: Container(
                color: Colors.black.withOpacity(0.7),
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32.0),
                    child: Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 8,
                      child: Padding(
                        padding: const EdgeInsets.all(24.0),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.block_outlined,
                              color: Colors.red,
                              size: 64,
                            ),
                            const SizedBox(height: 16),
                            const Text(
                              'Akun Dinonaktifkan',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 12),
                            const Text(
                              'Maaf, akun Anda telah dinonaktifkan oleh administrator. Silakan hubungi tim dukungan untuk informasi lebih lanjut.',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey,
                                height: 1.4,
                              ),
                            ),
                            const SizedBox(height: 24),
                            Text(
                              'Keluar otomatis dalam $_secondsRemaining detik...',
                              style: const TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: Colors.redAccent,
                              ),
                            ),
                            const SizedBox(height: 16),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.red,
                                foregroundColor: Colors.white,
                                minimumSize: const Size(double.infinity, 44),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              onPressed: _forceLogout,
                              child: const Text('Keluar Sekarang'),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      );
    } else {
      _cancelTimer();
      return widget.child;
    }
  }
}
