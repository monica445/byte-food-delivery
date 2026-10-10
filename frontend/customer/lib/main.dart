import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'app.dart';
import 'features/auth/services/auth_service.dart';
import 'features/auth/viewmodels/auth_viewmodel.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthViewModel(AuthService())),
      ],
      child: const ByteMeApp(),
    ),
  );
}
