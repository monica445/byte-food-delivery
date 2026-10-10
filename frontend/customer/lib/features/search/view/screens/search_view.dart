import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';

class SearchView extends StatelessWidget {
  const SearchView({super.key});

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
                'Search',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Search shops or food...',
                  prefixIcon: const Icon(Icons.search),
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              const Center(
                child: Text(
                  'Search results will appear here.',
                  style: TextStyle(color: AppColors.hint),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
