import 'package:customer/features/auth/views/screens/signin_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/constants/app_colors.dart';
import 'features/auth/services/auth_service.dart';
import 'features/auth/viewmodels/auth_viewmodel.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AuthViewModel(AuthService()),
      child: const ByteMeApp(),
    ),
  );
}

class ByteMeApp extends StatelessWidget {
  const ByteMeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ByteMe Food Delivery',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: ColorScheme.fromSeed(seedColor: AppColors.primary),
        fontFamily: 'Roboto',
      ),
      home: const SignInView(),
    );
  }
}
