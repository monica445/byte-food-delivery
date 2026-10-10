import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../features/auth/viewmodels/auth_viewmodel.dart';
import '../features/auth/views/screens/signin_view.dart';
import 'main_navigation.dart';

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;

      context.read<AuthViewModel>().checkAuthStatus();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthViewModel>(
      builder: (context, auth, child) {
        if (auth.isLoading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (auth.isAuthenticated) {
          return const MainNavigation();
        }

        return const SignInView();
      },
    );
  }
}
