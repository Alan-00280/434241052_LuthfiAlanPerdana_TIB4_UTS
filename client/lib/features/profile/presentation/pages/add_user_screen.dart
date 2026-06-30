import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';
import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class AddUserScreen extends ConsumerStatefulWidget {
  const AddUserScreen({super.key});

  @override
  ConsumerState<AddUserScreen> createState() => _AddUserScreenState();
}

class _AddUserScreenState extends ConsumerState<AddUserScreen> {
  final _formKey = GlobalKey<FormState>();

  final _usernameController = TextEditingController();
  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();

  String _selectedRole = 'HELPDESK';
  String _selectedSpeciality = 'SOFTWARE';
  bool _isLoading = false;

  @override
  void dispose() {
    _usernameController.dispose();
    _fullNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final payload = {
      'username': _usernameController.text.trim(),
      'fullName': _fullNameController.text.trim(),
      'email': _emailController.text.trim(),
      'password': _passwordController.text.trim(),
      'phone': _phoneController.text.trim().isEmpty
          ? null
          : _phoneController.text.trim(),
      'role': _selectedRole,
      if (_selectedRole == 'TECHSUPPORT') 'speciality': _selectedSpeciality,
    };

    try {
      final response = await ApiClient.instance.post(
        '/api/users',
        body: payload,
      );

      if (mounted) {
        final message =
            response?['message'] as String? ?? 'Staf berhasil didaftarkan';
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(message)));
        Navigator.pop(context, true); // Return true to trigger refresh
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal menambahkan pengguna: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Tambah Pengguna Baru'),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Data Akun & Staf',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Username
                    TextFormField(
                      controller: _usernameController,
                      decoration: const InputDecoration(
                        labelText: 'Username',
                        prefixIcon: Icon(Icons.alternate_email),
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Username wajib diisi';
                        }
                        if (value.contains(' ')) {
                          return 'Username tidak boleh mengandung spasi';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Full Name
                    TextFormField(
                      controller: _fullNameController,
                      decoration: const InputDecoration(
                        labelText: 'Nama Lengkap',
                        prefixIcon: Icon(Icons.person_outline),
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Nama lengkap wajib diisi';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Email
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        prefixIcon: Icon(Icons.mail_outline),
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Email wajib diisi';
                        }
                        final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                        if (!emailRegex.hasMatch(value)) {
                          return 'Format email tidak valid';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Password
                    TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: const InputDecoration(
                        labelText: 'Password',
                        prefixIcon: Icon(Icons.lock_outline),
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Password wajib diisi';
                        }
                        if (value.length < 6) {
                          return 'Password minimal 6 karakter';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Phone (Optional)
                    TextFormField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        labelText: 'Nomor Telepon (Opsional)',
                        prefixIcon: Icon(Icons.phone_outlined),
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Divider(),
                    const SizedBox(height: 16),
                    const Text(
                      'Peran & Penugasan',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Role Selection
                    DropdownButtonFormField<String>(
                      value: _selectedRole,
                      decoration: const InputDecoration(
                        labelText: 'Peran (Role)',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.admin_panel_settings_outlined),
                      ),
                      items: const [
                        DropdownMenuItem(
                          value: 'HELPDESK',
                          child: Text('HELPDESK'),
                        ),
                        DropdownMenuItem(
                          value: 'TECHSUPPORT',
                          child: Text('TECHSUPPORT'),
                        ),
                      ],
                      onChanged: (val) {
                        if (val != null) {
                          setState(() {
                            _selectedRole = val;
                          });
                        }
                      },
                    ),

                    // Conditional Speciality selection (only if Role = TECHSUPPORT)
                    if (_selectedRole == 'TECHSUPPORT') ...[
                      const SizedBox(height: 16),
                      DropdownButtonFormField<String>(
                        value: _selectedSpeciality,
                        decoration: const InputDecoration(
                          labelText: 'Spesialisasi (Speciality)',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.build_circle_outlined),
                        ),
                        items: const [
                          DropdownMenuItem(
                            value: 'SOFTWARE',
                            child: Text(
                              'SOFTWARE (Aplikasi, OS, Instalasi)',
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                          DropdownMenuItem(
                            value: 'HARDWARE',
                            child: Text(
                              'HARDWARE (PC, Laptop, Printer)',
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                          DropdownMenuItem(
                            value: 'NETWORK',
                            child: Text(
                              'NETWORK (Jaringan, Internet, Wifi)',
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                          DropdownMenuItem(
                            value: 'ACCOUNT_AUTH',
                            child: Text(
                              'ACCOUNT & AUTH (Reset password, login)',
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                          DropdownMenuItem(
                            value: 'INFRASTRUCTURE',
                            child: Text(
                              'INFRASTRUCTURE (Server, Database, Cloud)',
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                        ],
                        onChanged: (val) {
                          if (val != null) {
                            setState(() {
                              _selectedSpeciality = val;
                            });
                          }
                        },
                      ),
                    ],

                    const SizedBox(height: 40),

                    // Save Button
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: _submitForm,
                      child: const Text(
                        'Simpan & Daftarkan Staf',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
    );
  }
}
