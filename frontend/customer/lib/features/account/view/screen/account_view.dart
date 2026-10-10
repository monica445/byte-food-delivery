import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';

class AccountView extends StatelessWidget {
  const AccountView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              const Text(
                'My Account',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 24),
              const CircleAvatar(
                radius: 36,
                backgroundColor: AppColors.primary,
                child: Icon(
                  Icons.person_outline,
                  size: 40,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 24),
              _AccountItem(
                icon: Icons.person_outline,
                title: 'Personal information',
              ),
              _AccountItem(
                icon: Icons.location_on_outlined,
                title: 'My addresses',
              ),
              _AccountItem(icon: Icons.language, title: 'Language'),
              _AccountItem(icon: Icons.logout, title: 'Log out'),
            ],
          ),
        ),
      ),
    );
  }
}

class _AccountItem extends StatelessWidget {
  final IconData icon;
  final String title;

  const _AccountItem({required this.icon, required this.title});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, color: AppColors.primary),
      title: Text(title),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        // Implement this feature later.
      },
    );
  }
}
