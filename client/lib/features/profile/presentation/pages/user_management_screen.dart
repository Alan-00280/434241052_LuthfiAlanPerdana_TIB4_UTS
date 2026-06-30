import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';
import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';

class UserManagementScreen extends ConsumerStatefulWidget {
  const UserManagementScreen({super.key});

  @override
  ConsumerState<UserManagementScreen> createState() => _UserManagementScreenState();
}

class _UserManagementScreenState extends ConsumerState<UserManagementScreen> {
  List<dynamic> _users = [];
  bool _isLoading = true;
  String? _error;

  // Filter states
  final _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedRole = 'ALL';
  String _selectedStatus = 'ALL';

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _fetchUsers() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final response = await ApiClient.instance.get('/api/users');
      if (response != null && response['users'] != null) {
        setState(() {
          _users = response['users'] as List;
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Gagal memuat data pengguna.';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Error: $e';
        _isLoading = false;
      });
    }
  }

  List<dynamic> get _filteredUsers {
    return _users.where((user) {
      final fullName = (user['fullName'] as String? ?? '').toLowerCase();
      final username = (user['username'] as String? ?? '').toLowerCase();
      final email = (user['email'] as String? ?? '').toLowerCase();
      final role = user['role'] as String? ?? 'USER';
      final isActive = user['isActive'] as bool? ?? true;

      // 1. Search Query filter (checks fullName, username, and email)
      if (_searchQuery.isNotEmpty) {
        final q = _searchQuery.toLowerCase();
        if (!fullName.contains(q) && !username.contains(q) && !email.contains(q)) {
          return false;
        }
      }

      // 2. Role filter
      if (_selectedRole != 'ALL') {
        if (role.toUpperCase() != _selectedRole.toUpperCase()) {
          return false;
        }
      }

      // 3. Status filter
      if (_selectedStatus != 'ALL') {
        final statusBool = _selectedStatus == 'ACTIVE';
        if (isActive != statusBool) {
          return false;
        }
      }

      return true;
    }).toList();
  }

  Future<void> _toggleUserActive(String userId, bool currentStatus) async {
    try {
      final response = await ApiClient.instance.patch('/api/users/$userId/toggle-active');
      final message = response?['message'] as String? ?? 'Status berhasil diubah';
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(message)),
        );
      }
      _fetchUsers(); // Refresh the list
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal mengubah status: $e')),
        );
      }
    }
  }

  void _showEditNameDialog(String userId, String currentName) {
    final nameController = TextEditingController(text: currentName);
    bool isSaving = false;

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setDialogState) {
            return AlertDialog(
              title: const Text('Edit Nama Lengkap'),
              content: TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Nama Lengkap',
                  border: OutlineInputBorder(),
                ),
              ),
              actions: [
                TextButton(
                  onPressed: isSaving ? null : () => Navigator.pop(ctx),
                  child: const Text('Batal'),
                ),
                ElevatedButton(
                  onPressed: isSaving
                      ? null
                      : () async {
                          final newName = nameController.text.trim();
                          if (newName.isEmpty) return;

                          setDialogState(() => isSaving = true);
                          try {
                            await ApiClient.instance.put(
                              '/api/users/$userId',
                              body: {'fullName': newName},
                            );
                            if (ctx.mounted) {
                              Navigator.pop(ctx);
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Nama berhasil diperbarui.')),
                              );
                            }
                            _fetchUsers(); // Refresh
                          } catch (e) {
                            if (ctx.mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Gagal mengedit nama: $e')),
                              );
                            }
                          } finally {
                            setDialogState(() => isSaving = false);
                          }
                        },
                  child: isSaving
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                        )
                      : const Text('Simpan'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  void _showUserProfileDialog(Map<String, dynamic> user) {
    final String fullName = user['fullName'] as String? ?? '';
    final String email = user['email'] as String? ?? '';
    final String username = user['username'] as String? ?? '';
    final String role = user['role'] as String? ?? 'USER';
    final String phone = user['phone'] as String? ?? '-';
    final String? avatarUrl = user['avatarUrl'] as String?;
    final bool isActive = user['isActive'] as bool? ?? true;
    final String id = user['id'] as String? ?? '';

    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: Row(
            children: [
              const Icon(Icons.person, color: AppColors.primary),
              const SizedBox(width: 8),
              const Text('Profil Pengguna'),
            ],
          ),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: AppColors.primaryLight,
                  backgroundImage: avatarUrl != null ? NetworkImage(avatarUrl) : null,
                  child: avatarUrl == null
                      ? const Icon(Icons.person, size: 40, color: AppColors.primary)
                      : null,
                ),
                const SizedBox(height: 16),
                Text(
                  fullName,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  textAlign: TextAlign.center,
                ),
                Text(
                  '@$username',
                  style: TextStyle(color: Colors.grey[600], fontSize: 14),
                ),
                const SizedBox(height: 16),
                const Divider(),
                _buildInfoRow(Icons.badge, 'ID', id),
                _buildInfoRow(Icons.email, 'Email', email),
                _buildInfoRow(Icons.phone, 'Telepon', phone),
                _buildInfoRow(Icons.admin_panel_settings, 'Peran', role),
                _buildInfoRow(
                  isActive ? Icons.check_circle : Icons.block,
                  'Status',
                  isActive ? 'Active' : 'Suspended',
                  color: isActive ? Colors.green : Colors.red,
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Tutup'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(ctx);
                _showEditNameDialog(id, fullName);
              },
              child: const Text('Edit Nama'),
            ),
          ],
        );
      },
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, {Color? color}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 18, color: color ?? Colors.grey[600]),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 11)),
                const SizedBox(height: 2),
                Text(
                  value,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: color,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Manajemen Pengguna',
        actions: [
          IconButton(
            icon: const Icon(Icons.person_add_alt_1, color: Colors.white),
            tooltip: 'Tambah Staf',
            onPressed: () async {
              final result = await context.push(AppRoutes.addUser);
              if (result == true) {
                _fetchUsers();
              }
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline, size: 48, color: Colors.red),
                      const SizedBox(height: 16),
                      Text(_error!),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _fetchUsers,
                        child: const Text('Coba Lagi'),
                      ),
                    ],
                  ),
                )
              : Column(
                  children: [
                    // 1. Search Box
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: TextField(
                        controller: _searchController,
                        decoration: InputDecoration(
                          hintText: 'Cari Nama, Username, atau Email...',
                          prefixIcon: const Icon(Icons.search),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                        ),
                        onChanged: (val) {
                          setState(() {
                            _searchQuery = val.trim();
                          });
                        },
                      ),
                    ),
                    
                    // 2. Dropdown Filters
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              value: _selectedRole,
                              decoration: InputDecoration(
                                labelText: 'Role',
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                              ),
                              items: const [
                                DropdownMenuItem(value: 'ALL', child: Text('Semua Role')),
                                DropdownMenuItem(value: 'ADMIN', child: Text('ADMIN')),
                                DropdownMenuItem(value: 'HELPDESK', child: Text('HELPDESK')),
                                DropdownMenuItem(value: 'TECHSUPPORT', child: Text('TECHSUPPORT')),
                                DropdownMenuItem(value: 'USER', child: Text('USER')),
                              ],
                              onChanged: (val) {
                                if (val != null) {
                                  setState(() {
                                    _selectedRole = val;
                                  });
                                }
                              },
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              value: _selectedStatus,
                              decoration: InputDecoration(
                                labelText: 'Status',
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                              ),
                              items: const [
                                DropdownMenuItem(value: 'ALL', child: Text('Semua Status')),
                                DropdownMenuItem(value: 'ACTIVE', child: Text('Active')),
                                DropdownMenuItem(value: 'SUSPENDED', child: Text('Suspended')),
                              ],
                              onChanged: (val) {
                                if (val != null) {
                                  setState(() {
                                    _selectedStatus = val;
                                  });
                                }
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // 3. Scrollable Table Area (Bounded Y-scroll at 70% parent height, X-scroll enabled)
                    Expanded(
                      child: LayoutBuilder(
                        builder: (context, constraints) {
                          final maxTableHeight = constraints.maxHeight * 0.70;
                          final filteredList = _filteredUsers;

                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Container(
                                height: maxTableHeight,
                                margin: const EdgeInsets.symmetric(horizontal: 16),
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey.shade300),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(12),
                                  child: filteredList.isEmpty
                                      ? const Center(child: Text('Tidak ada data pengguna yang cocok.'))
                                      : SingleChildScrollView(
                                          scrollDirection: Axis.vertical,
                                          child: SingleChildScrollView(
                                            scrollDirection: Axis.horizontal,
                                            child: DataTable(
                                              columns: const [
                                                DataColumn(label: Text('User')),
                                                DataColumn(label: Text('Phone')),
                                                DataColumn(label: Text('Role')),
                                                DataColumn(label: Text('Status')),
                                                DataColumn(label: Text('Joined Date')),
                                                DataColumn(label: Text('Actions')),
                                              ],
                                              rows: filteredList.map((user) {
                                                final id = user['id'] as String;
                                                final username = user['username'] as String? ?? '';
                                                final fullName = user['fullName'] as String? ?? '';
                                                final email = user['email'] as String? ?? '';
                                                final phone = user['phone'] as String? ?? '-';
                                                final role = user['role'] as String? ?? 'USER';
                                                final avatarUrl = user['avatarUrl'] as String?;
                                                final isActive = user['isActive'] as bool? ?? true;
                                                
                                                DateTime? joinedDate;
                                                if (user['createdAt'] != null) {
                                                  joinedDate = DateTime.tryParse(user['createdAt'] as String);
                                                }
                                                
                                                final formattedDate = joinedDate != null
                                                    ? DateFormat('dd MMM yyyy, hh:mm a').format(joinedDate.toLocal())
                                                    : '-';

                                                return DataRow(
                                                  cells: [
                                                    // User
                                                    DataCell(
                                                      Row(
                                                        mainAxisSize: MainAxisSize.min,
                                                        children: [
                                                          CircleAvatar(
                                                            radius: 16,
                                                            backgroundImage: avatarUrl != null ? NetworkImage(avatarUrl) : null,
                                                            backgroundColor: AppColors.primaryLight,
                                                            child: avatarUrl == null
                                                                ? const Icon(Icons.person, size: 16, color: AppColors.primary)
                                                                : null,
                                                          ),
                                                          const SizedBox(width: 8),
                                                          Column(
                                                            mainAxisAlignment: MainAxisAlignment.center,
                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                            children: [
                                                              Text(
                                                                fullName,
                                                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                                              ),
                                                              Text(
                                                                email,
                                                                style: TextStyle(color: Colors.grey[500], fontSize: 11),
                                                              ),
                                                            ],
                                                          ),
                                                        ],
                                                      ),
                                                    ),
                                                    // Phone
                                                    DataCell(Text(phone)),
                                                    // Role
                                                    DataCell(
                                                      Container(
                                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                                        decoration: BoxDecoration(
                                                          color: Colors.grey[200],
                                                          borderRadius: BorderRadius.circular(4),
                                                        ),
                                                        child: Text(
                                                          role,
                                                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey[800]),
                                                        ),
                                                      ),
                                                    ),
                                                    // Status
                                                    DataCell(
                                                      Container(
                                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                                        decoration: BoxDecoration(
                                                          color: isActive ? Colors.green.shade50 : Colors.red.shade50,
                                                          borderRadius: BorderRadius.circular(4),
                                                          border: Border.all(color: isActive ? Colors.green.shade300 : Colors.red.shade300),
                                                        ),
                                                        child: Text(
                                                          isActive ? 'Active' : 'Suspended',
                                                          style: TextStyle(
                                                            fontSize: 10,
                                                            fontWeight: FontWeight.bold,
                                                            color: isActive ? Colors.green.shade800 : Colors.red.shade800,
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                    // Joined Date
                                                    DataCell(Text(formattedDate)),
                                                    // Actions
                                                    DataCell(
                                                      PopupMenuButton<String>(
                                                        icon: const Icon(Icons.more_vert, color: Colors.grey),
                                                        onSelected: (value) {
                                                          if (value == 'toggle-status') {
                                                            _toggleUserActive(id, isActive);
                                                          } else if (value == 'view-profile') {
                                                            _showUserProfileDialog(user);
                                                          }
                                                        },
                                                        itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                                                          PopupMenuItem<String>(
                                                            value: 'view-profile',
                                                            child: Row(
                                                              children: [
                                                                Icon(Icons.remove_red_eye_outlined, size: 18, color: Colors.grey[700]),
                                                                const SizedBox(width: 8),
                                                                const Text('Lihat Profil'),
                                                              ],
                                                            ),
                                                          ),
                                                          PopupMenuItem<String>(
                                                            value: 'toggle-status',
                                                            child: Row(
                                                              children: [
                                                                Icon(
                                                                  isActive ? Icons.block : Icons.check_circle_outline,
                                                                  size: 18,
                                                                  color: isActive ? Colors.red : Colors.green,
                                                                ),
                                                                const SizedBox(width: 8),
                                                                Text(
                                                                  isActive ? 'Suspend User' : 'Unsuspend User',
                                                                  style: TextStyle(color: isActive ? Colors.red : Colors.green),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ],
                                                      ),
                                                    ),
                                                  ],
                                                );
                                              }).toList(),
                                            ),
                                          ),
                                        ),
                                ),
                              ),
                            ],
                          );
                        },
                      ),
                    ),
                  ],
                ),
    );
  }
}
