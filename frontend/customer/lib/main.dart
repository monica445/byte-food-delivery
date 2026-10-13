import 'package:customer/features/home/services/home_service.dart';
import 'package:customer/features/home/view_models/home_view_model.dart';
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
        ChangeNotifierProvider(
          create: (_) => HomeViewModel(homeService: HomeService()),
        ),
      ],
      child: const ByteMeApp(),
    ),
  );
}
