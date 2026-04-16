import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'dart:io';
import 'package:helpdesk_ticketing/main.dart';

class AuthPage extends ConsumerStatefulWidget {
  const AuthPage({super.key});

  @override
  ConsumerState<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends ConsumerState<AuthPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  /// Parse Supabase errors and return user-friendly message
  String _getErrorMessage(dynamic error) {
    if (error is AuthApiException) {
      final code = error.code;
      final message = error.message;

      switch (code) {
        case 'invalid_credentials':
          return 'Email atau password salah. Silahkan coba lagi.';
        case 'user_not_found':
          return 'Akun dengan email ini tidak ditemukan.';
        case 'email_not_confirmed':
          return 'Email Anda belum dikonfirmasi. Silahkan cek email Anda.';
        case 'user_banned':
          return 'Akun Anda telah dilarang.';
        case 'invalid_grant':
          return 'Login gagal. Silahkan coba lagi.';
        case 'over_email_send_rate_limit':
          return 'Terlalu banyak percobaan. Silahkan coba lagi nanti.';
        default:
          return message.isNotEmpty
              ? message
              : 'Login gagal. Silahkan coba lagi.';
      }
    } else if (error is SocketException) {
      return 'Koneksi internet gagal. Silahkan cek jaringan Anda.';
    } else {
      return 'Terjadi kesalahan: ${error.toString()}';
    }
  }

  void _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      messengerKey.currentState?.showSnackBar(
        const SnackBar(
          content: Text('Email dan password tidak boleh kosong'),
          duration: Duration(seconds: 3),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final controller = ref.read(authControllerProvider.notifier);
      await controller.login(email, password);
      // Success - AuthWrapper akan handle navigation
    } catch (e) {
      final errorMessage = _getErrorMessage(e);
      print("Error tertangkap di UI: $e; Message: $errorMessage");
      
      // Gunakan global messengerKey - stabil, tidak perlu context/mounted
      messengerKey.currentState?.showSnackBar(
        SnackBar(
          content: Text(errorMessage),
          duration: const Duration(seconds: 4),
          backgroundColor: Colors.red.shade600,
          behavior: SnackBarBehavior.floating,
        ),
      );
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login'), centerTitle: true),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 60),
              Text(
                'E-Ticketing Helpdesk',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 60),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Masukkan email Anda',
                  prefixIcon: const Icon(Icons.email),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Masukkan password Anda',
                  prefixIcon: const Icon(Icons.lock),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                obscureText: true,
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isLoading ? null : _handleLogin,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 48),
                  disabledBackgroundColor: Colors.grey.shade300,
                ),
                child: _isLoading
                    ? const SizedBox(
                        height: 24,
                        width: 24,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Login'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
