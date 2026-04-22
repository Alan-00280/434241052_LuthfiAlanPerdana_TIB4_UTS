import 'dart:convert';
import 'dart:io';
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Wrapper HTTP client sederhana untuk komunikasi dengan REST API backend.
/// Semua request otomatis menyertakan Bearer token dari Supabase session.
class ApiClient {
  ApiClient._();

  static final ApiClient instance = ApiClient._();

  /// Base URL diambil dari .env (API_URL)
  String get _baseUrl =>
      dotenv.env['API_URL'] ?? 'http://localhost:3000';

  String? _accessToken;

  /// Set token setelah login. Dipanggil dari AuthController.
  void setToken(String? token) {
    _accessToken = token;
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
      };

  // ─── GET ────────────────────────────────────────────────────────────────

  Future<dynamic> get(String path, {Map<String, String?>? query}) async {
    final uri = _buildUri(path, query);
    final client = HttpClient();
    try {
      final request = await client.getUrl(uri);
      _applyHeaders(request);
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── POST ───────────────────────────────────────────────────────────────

  Future<dynamic> post(String path, {Object? body}) async {
    final uri = _buildUri(path);
    final client = HttpClient();
    try {
      final request = await client.postUrl(uri);
      _applyHeaders(request);
      if (body != null) {
        request.write(jsonEncode(body));
      }
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── PUT ────────────────────────────────────────────────────────────────

  Future<dynamic> put(String path, {Object? body}) async {
    final uri = _buildUri(path);
    final client = HttpClient();
    try {
      final request = await client.putUrl(uri);
      _applyHeaders(request);
      if (body != null) {
        request.write(jsonEncode(body));
      }
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── PATCH ──────────────────────────────────────────────────────────────

  Future<dynamic> patch(String path, {Object? body}) async {
    final uri = _buildUri(path);
    final client = HttpClient();
    try {
      final request = await client.patchUrl(uri);
      _applyHeaders(request);
      if (body != null) {
        request.write(jsonEncode(body));
      }
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── DELETE ─────────────────────────────────────────────────────────────

  Future<dynamic> delete(String path, {Object? body}) async {
    final uri = _buildUri(path);
    final client = HttpClient();
    try {
      final request = await client.deleteUrl(uri);
      _applyHeaders(request);
      if (body != null) {
        request.write(jsonEncode(body));
      }
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── Multipart (file upload) ─────────────────────────────────────────────

  Future<dynamic> uploadFile(
    String path, {
    required File file,
    required String fieldName,
    Map<String, String>? fields,
  }) async {
    final uri = _buildUri(path);
    final boundary = '----FormBoundary${DateTime.now().millisecondsSinceEpoch}';
    final client = HttpClient();
    try {
      final request = await client.postUrl(uri);
      request.headers.set(
        'Content-Type',
        'multipart/form-data; boundary=$boundary',
      );
      if (_accessToken != null) {
        request.headers.set('Authorization', 'Bearer $_accessToken');
      }

      final bytes = await file.readAsBytes();
      final body = StringBuffer();

      // Additional fields
      fields?.forEach((key, value) {
        body.write('--$boundary\r\n');
        body.write('Content-Disposition: form-data; name="$key"\r\n\r\n');
        body.write('$value\r\n');
      });

      // Resolve Content-Type
      final ext = file.uri.pathSegments.last.split('.').last.toLowerCase();
      String mimeType = 'application/octet-stream';
      if (ext == 'pdf') mimeType = 'application/pdf';
      else if (ext == 'jpg' || ext == 'jpeg') mimeType = 'image/jpeg';
      else if (ext == 'png') mimeType = 'image/png';
      else if (ext == 'gif') mimeType = 'image/gif';
      else if (ext == 'webp') mimeType = 'image/webp';
      else if (ext == 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      else if (ext == 'md') mimeType = 'text/markdown';
      else if (ext == 'json') mimeType = 'application/json';

      // File field
      body.write('--$boundary\r\n');
      body.write(
        'Content-Disposition: form-data; name="$fieldName"; filename="${file.uri.pathSegments.last}"\r\n',
      );
      body.write('Content-Type: $mimeType\r\n\r\n');

      request.add(utf8.encode(body.toString()));
      request.add(bytes);
      request.add(utf8.encode('\r\n--$boundary--\r\n'));

      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  Future<dynamic> postMultipart(
    String path, {
    Map<String, String>? fields,
    List<File>? files,
    String fileFieldName = 'attachments',
  }) async {
    final uri = _buildUri(path);
    final boundary = '----FormBoundary${DateTime.now().millisecondsSinceEpoch}';
    final client = HttpClient();
    
    try {
      final request = await client.postUrl(uri);
      request.headers.set(
        'Content-Type',
        'multipart/form-data; boundary=$boundary',
      );
      if (_accessToken != null) {
        request.headers.set('Authorization', 'Bearer $_accessToken');
      }

      final body = StringBuffer();

      // Additional fields
      fields?.forEach((key, value) {
        body.write('--$boundary\r\n');
        body.write('Content-Disposition: form-data; name="$key"\r\n\r\n');
        body.write('$value\r\n');
      });

      // Initialize byte array payload
      final payloadData = <int>[];
      payloadData.addAll(utf8.encode(body.toString()));

      // Files
      if (files != null) {
        for (final file in files) {
          final ext = file.uri.pathSegments.last.split('.').last.toLowerCase();
          String mimeType = 'application/octet-stream';
          if (ext == 'pdf') mimeType = 'application/pdf';
          else if (ext == 'jpg' || ext == 'jpeg') mimeType = 'image/jpeg';
          else if (ext == 'png') mimeType = 'image/png';
          else if (ext == 'gif') mimeType = 'image/gif';
          else if (ext == 'webp') mimeType = 'image/webp';
          else if (ext == 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          else if (ext == 'md') mimeType = 'text/markdown';
          else if (ext == 'json') mimeType = 'application/json';

          final fileHeader = StringBuffer();
          fileHeader.write('--$boundary\r\n');
          fileHeader.write(
            'Content-Disposition: form-data; name="$fileFieldName"; filename="${file.uri.pathSegments.last}"\r\n',
          );
          fileHeader.write('Content-Type: $mimeType\r\n\r\n');
          payloadData.addAll(utf8.encode(fileHeader.toString()));
          
          final bytes = await file.readAsBytes();
          payloadData.addAll(bytes);
          payloadData.addAll(utf8.encode('\r\n'));
        }
      }

      payloadData.addAll(utf8.encode('--$boundary--\r\n'));

      request.add(payloadData);
      
      final response = await request.close();
      return _parseResponse(response);
    } finally {
      client.close();
    }
  }

  // ─── Helpers ────────────────────────────────────────────────────────────

  Uri _buildUri(String path, [Map<String, String?>? query]) {
    final base = _baseUrl.replaceAll(RegExp(r'/$'), '');
    final fullUrl = '$base$path';
    final uri = Uri.parse(fullUrl);
    if (query != null && query.isNotEmpty) {
      final filtered = Map.fromEntries(
        query.entries.where((e) => e.value != null),
      ).cast<String, String>();
      return uri.replace(queryParameters: filtered);
    }
    return uri;
  }

  void _applyHeaders(HttpClientRequest request) {
    _headers.forEach((key, value) {
      request.headers.set(key, value);
    });
  }

  Future<dynamic> _parseResponse(HttpClientResponse response) async {
    final body = await response.transform(utf8.decoder).join();
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (body.isEmpty) return null;
      return jsonDecode(body);
    } else {
      // Coba parse error message dari body
      String message = 'Request failed [${response.statusCode}]';
      try {
        final json = jsonDecode(body);
        message = json['message'] as String? ??
            json['error'] as String? ??
            message;
      } catch (_) {}
      throw ApiException(
        statusCode: response.statusCode,
        message: message,
      );
    }
  }
}

/// Exception khusus untuk error dari API
class ApiException implements Exception {
  final int statusCode;
  final String message;

  const ApiException({required this.statusCode, required this.message});

  @override
  String toString() => 'ApiException($statusCode): $message';

  bool get isUnauthorized => statusCode == 401;
  bool get isForbidden => statusCode == 403;
  bool get isNotFound => statusCode == 404;
  bool get isServerError => statusCode >= 500;

  /// Pesan yang ramah untuk ditampilkan ke user
  String get userMessage {
    if (isUnauthorized) return 'Sesi Anda telah berakhir. Silakan login kembali.';
    if (isForbidden) return 'Anda tidak memiliki akses ke data ini.';
    if (isNotFound) return 'Data tidak ditemukan.';
    if (isServerError) return 'Terjadi kesalahan server. Silakan coba lagi.';
    return message;
  }
}
