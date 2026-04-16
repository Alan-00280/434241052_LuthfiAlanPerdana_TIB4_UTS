/// API Request Helper
/// 
/// This file demonstrates how to use the authentication token in API requests.
/// The token is automatically managed by AuthController through Supabase's
/// onAuthStateChange stream.
/// 
/// Example Usage:
/// 
/// ```dart
/// import 'package:flutter_riverpod/flutter_riverpod.dart';
/// import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
/// 
/// class TicketService {
///   Future<List<Ticket>> fetchTickets(WidgetRef ref) async {
///     // Get the access token from the provider
///     final token = ref.watch(accessTokenProvider);
///     
///     if (token == null) {
///       throw Exception('Not authenticated');
///     }
///     
///     // Use token in your HTTP requests
///     final response = await http.get(
///       Uri.parse('https://your-backend.com/api/tickets'),
///       headers: {
///         'Authorization': 'Bearer $token',
///         'Content-Type': 'application/json',
///       },
///     );
///     
///     if (response.statusCode == 200) {
///       // Parse and return tickets
///     } else {
///       throw Exception('Failed to fetch tickets');
///     }
///   }
/// }
/// ```
/// 
/// Token Storage & Auto-Refresh:
/// 
/// The AuthController automatically:
/// 1. Listens to Supabase's `onAuthStateChange` stream
/// 2. Stores token when user logs in
/// 3. Updates token when it changes
/// 4. Clears token when user logs out
/// 5. Provides methods to retrieve token: `getAccessToken()` or `getAuthToken()`
/// 
/// Usage in Widgets:
/// 
/// ```dart
/// Consumer(
///   builder: (context, ref, child) {
///     final token = ref.watch(accessTokenProvider);
///     // Use token for API calls
///     return MyWidget(token: token);
///   },
/// )
/// ```
/// 
/// Token Properties:
/// - `accessToken`: The JWT token for API authentication
/// - `refreshToken`: Token for refreshing expired access tokens
/// - `expiresAt`: When the token expires
/// - `isValid`: Check if token is still valid
/// - `isExpired`: Check if token has expired
library;