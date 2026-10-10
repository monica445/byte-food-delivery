import 'package:flutter/material.dart';

import 'app/auth_gate.dart';
import 'core/constants/app_colors.dart';

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
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          primary: AppColors.primary,
        ),
        fontFamily: 'Roboto',
      ),
      home: const AuthGate(),
    );
  }
}
