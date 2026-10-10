import 'package:flutter/material.dart';

import '../models/auth_user.dart';
import '../services/auth_service.dart';

class AuthViewModel extends ChangeNotifier {
  final AuthService _authService;

  AuthViewModel(this._authService);

  AuthUser? _user;
  bool _isLoading = false;
  bool _isInitializing = true;
  String? _errorMessage;

  AuthUser? get user => _user;
  bool get isLoading => _isLoading;
  bool get isInitializing => _isInitializing;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _user != null;

  Future<void> checkAuthStatus() async {
    try {
      _user = await _authService.restoreSession();
    } catch (_) {
      _user = null;
    } finally {
      _isInitializing = false;
      notifyListeners();
    }
  }

  Future<bool> signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    return _run(
      () => _authService.signUp(name: name, email: email, password: password),
    );
  }

  Future<bool> signIn({
    required String identifier,
    required String password,
  }) async {
    return _run(
      () => _authService.signIn(identifier: identifier, password: password),
    );
  }

  Future<bool> _run(Future<AuthUser> Function() action) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _user = await action();
      return true;
    } catch (error) {
      _errorMessage = _authService.getErrorMessage(error);
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    await _authService.signOut();
    _user = null;
    _errorMessage = null;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
