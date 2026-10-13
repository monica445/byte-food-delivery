import 'package:customer/core/constants/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../view_models/home_view_model.dart';
import '../widgets/shop_category_card.dart';
import '../widgets/shop_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String? selectedCategoryId;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;

      context.read<HomeViewModel>().fetchHomeData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<HomeViewModel>(
      builder: (context, viewModel, child) {
        final filteredShops = selectedCategoryId == null
            ? viewModel.shops
            : viewModel.shops
                  .where((shop) => shop.shopCategoryId == selectedCategoryId)
                  .toList();

        return Scaffold(
          backgroundColor: AppColors.background,
          body: SafeArea(
            child: RefreshIndicator(
              color: AppColors.primary,
              onRefresh: viewModel.refresh,
              child: CustomScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                slivers: [
                  // Header
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Find your favorite food',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey.shade600,
                            ),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'What would you like to eat?',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Loading
                  if (viewModel.isLoading &&
                      viewModel.categories.isEmpty &&
                      viewModel.shops.isEmpty)
                    const SliverFillRemaining(
                      hasScrollBody: false,
                      child: Center(
                        child: CircularProgressIndicator(
                          color: AppColors.primary,
                        ),
                      ),
                    )
                  // Error
                  else if (viewModel.errorMessage != null &&
                      viewModel.categories.isEmpty &&
                      viewModel.shops.isEmpty)
                    SliverFillRemaining(
                      hasScrollBody: false,
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(24),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(
                                Icons.cloud_off_outlined,
                                size: 48,
                                color: Colors.grey,
                              ),
                              const SizedBox(height: 12),
                              Text(
                                viewModel.errorMessage!,
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 16),
                              ElevatedButton(
                                onPressed: viewModel.refresh,
                                child: const Text('Try again'),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                  else ...[
                    // Categories heading
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: Row(
                          children: [
                            const Expanded(
                              child: Text(
                                'Categories',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            TextButton(
                              onPressed: () {
                                setState(() {
                                  selectedCategoryId = null;
                                });
                              },
                              child: const Text(
                                'See all',
                                style: TextStyle(color: AppColors.primary),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Category cards
                    SliverToBoxAdapter(
                      child: SizedBox(
                        height: 110,
                        child: ListView.separated(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          scrollDirection: Axis.horizontal,
                          itemCount: viewModel.categories.length,
                          separatorBuilder: (_, __) =>
                              const SizedBox(width: 14),
                          itemBuilder: (context, index) {
                            final category = viewModel.categories[index];

                            return ShopCategoryCard(
                              category: category,
                              isSelected: selectedCategoryId == category.id,
                              onTap: () {
                                setState(() {
                                  selectedCategoryId =
                                      selectedCategoryId == category.id
                                      ? null
                                      : category.id;
                                });
                              },
                            );
                          },
                        ),
                      ),
                    ),

                    // Shops heading
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(20, 28, 20, 16),
                        child: Text(
                          selectedCategoryId == null
                              ? 'Popular shops'
                              : 'Shops in this category',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),

                    // Shop cards
                    if (filteredShops.isEmpty)
                      const SliverFillRemaining(
                        hasScrollBody: false,
                        child: Center(child: Text('No shops found.')),
                      )
                    else
                      SliverPadding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        sliver: SliverList(
                          delegate: SliverChildBuilderDelegate((
                            context,
                            index,
                          ) {
                            final shop = filteredShops[index];

                            return ShopCard(
                              shop: shop,
                              onTap: () {
                                // Navigate to shop details later.
                              },
                            );
                          }, childCount: filteredShops.length),
                        ),
                      ),
                  ],

                  const SliverToBoxAdapter(child: SizedBox(height: 24)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
