import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../../core/network/api_client.dart';
import '../models/auth_user.dart';

class AuthService {
  final Dio _dio = ApiClient.dio;

  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'access_token';

  Future<AuthUser> signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    final response = await _dio.post(
      '/auth/register',
      data: {'name': name.trim(), 'email': email.trim(), 'password': password},
    );

    return _saveSession(response.data);
  }

  Future<AuthUser> signIn({
    required String identifier,
    required String password,
  }) async {
    final response = await _dio.post(
      '/auth/login',
      data: {'identifier': identifier.trim(), 'password': password},
    );

    return _saveSession(response.data);
  }

  Future<AuthUser> _saveSession(Map<String, dynamic> data) async {
    final token = data['token'] as String;
    final user = AuthUser.fromJson(data['user'] as Map<String, dynamic>);

    await _storage.write(key: _tokenKey, value: token);

    return user;
  }

  Future<AuthUser?> restoreSession() async {
    final token = await getToken();

    if (token == null || token.isEmpty) {
      return null;
    }

    try {
      final response = await _dio.get(
        '/auth/me',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data as Map<String, dynamic>;

      return AuthUser.fromJson(data['user'] as Map<String, dynamic>);
    } on DioException catch (error) {
      final statusCode = error.response?.statusCode;

      if (statusCode == 401 || statusCode == 403) {
        await signOut();
        return null;
      }

      rethrow;
    }
  }

  Future<String?> getToken() {
    return _storage.read(key: _tokenKey);
  }

  Future<void> signOut() async {
    await _storage.delete(key: _tokenKey);
  }

  String getErrorMessage(Object error) {
    if (error is DioException) {
      final data = error.response?.data;

      if (data is Map && data['message'] is String) {
        return data['message'] as String;
      }

      if (error.response == null) {
        return 'Cannot connect to the server. Please try again.';
      }

      return 'Something went wrong. Please try again.';
    }

    return 'An unexpected error occurred.';
  }
}
