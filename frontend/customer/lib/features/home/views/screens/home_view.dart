import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return const _MockScreen(
      title: 'Discover',
      description: 'Explore food categories and available shops.',
      icon: Icons.storefront_outlined,
    );
  }
}

class _MockScreen extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;

  const _MockScreen({
    required this.title,
    required this.description,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            title,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(fontSize: 15, color: AppColors.hint),
          ),
          const SizedBox(height: 32),
          Expanded(
            child: Center(
              child: Icon(
                icon,
                size: 80,
                color: AppColors.primary.withValues(alpha: 0.7),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
