import 'package:customer/features/auth/viewmodels/auth_viewmodel.dart';
import 'package:customer/features/auth/views/screens/signup_view.dart';
import 'package:customer/features/auth/views/widgets/button.dart';
import 'package:customer/features/auth/views/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../core/constants/app_colors.dart';

class SignInView extends StatefulWidget {
  const SignInView({super.key});

  @override
  State<SignInView> createState() => _SignInViewState();
}

class _SignInViewState extends State<SignInView> {
  final _formKey = GlobalKey<FormState>();
  final _identifier = TextEditingController();
  final _password = TextEditingController();
  bool _hidePassword = true;

  @override
  void dispose() {
    _identifier.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();

    if (!_formKey.currentState!.validate()) return;

    final vm = context.read<AuthViewModel>();

    final success = await vm.signIn(
      identifier: _identifier.text,
      password: _password.text,
    );

    if (!mounted) return;

    if (success) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Welcome, ${vm.user!.name}!')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AuthViewModel>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: Column(
                  children: [
                    Container(
                      height: 220,
                      width: double.infinity,
                      color: AppColors.primary,
                      child: Center(
                        child: Image.asset(
                          'assets/images/logo.png',
                          width: 145,
                          errorBuilder: (_, __, ___) => const Text(
                            'byte me\nFOOD DELIVERY',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Transform.translate(
                      offset: const Offset(0, -28),
                      child: Container(
                        width: double.infinity,
                        constraints: const BoxConstraints(minHeight: 450),
                        padding: const EdgeInsets.fromLTRB(28, 42, 28, 24),
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.vertical(
                            top: Radius.circular(55),
                          ),
                        ),
                        child: Form(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Sign In',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.text,
                                ),
                              ),
                              const SizedBox(height: 48),
                              TextInput(
                                label: 'Email/Phone',
                                hint: 'Enter Your Email or Phone Number',
                                controller: _identifier,
                                validator: (value) {
                                  if (value == null || value.trim().isEmpty) {
                                    return 'Enter your email or phone number';
                                  }
                                  return null;
                                },
                                keyboardType: TextInputType.emailAddress,
                              ),
                              const SizedBox(height: 20),
                              TextInput(
                                label: 'Password',
                                hint: 'Enter Password',
                                controller: _password,
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter your password';
                                  }
                                  return null;
                                },
                                obscureText: _hidePassword,
                                suffixIcon: IconButton(
                                  onPressed: () => setState(
                                    () => _hidePassword = !_hidePassword,
                                  ),
                                  icon: Icon(
                                    _hidePassword
                                        ? Icons.visibility_off_outlined
                                        : Icons.visibility_outlined,
                                    size: 19,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 28),
                              if (vm.errorMessage != null) ...[
                                Text(
                                  vm.errorMessage!,
                                  style: const TextStyle(
                                    color: Colors.red,
                                    fontSize: 12,
                                  ),
                                ),
                                const SizedBox(height: 12),
                              ],
                              Button(
                                label: 'Sign In',
                                isLoading: vm.isLoading,
                                onPressed: _submit,
                              ),
                              const SizedBox(height: 30),
                              Center(
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  children: [
                                    const Text(
                                      "Don't have an account? ",
                                      style: TextStyle(fontSize: 12),
                                    ),
                                    GestureDetector(
                                      onTap: () {
                                        Navigator.pushReplacement(
                                          context,
                                          MaterialPageRoute(
                                            builder: (_) => const SignUpView(),
                                          ),
                                        );
                                      },
                                      child: const Text(
                                        'Sign Up',
                                        style: TextStyle(
                                          color: AppColors.primary,
                                          decoration: TextDecoration.underline,
                                          fontSize: 12,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
