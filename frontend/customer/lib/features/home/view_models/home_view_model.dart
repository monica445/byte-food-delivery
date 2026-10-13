import 'package:customer/features/home/services/home_service.dart';
import 'package:flutter/material.dart';

import '../models/shop_model.dart';
import '../models/shop_category_model.dart';

class HomeViewModel extends ChangeNotifier {
  final HomeService _homeService;

  HomeViewModel({HomeService? homeService})
    : _homeService = homeService ?? HomeService();

  List<ShopModel> shops = [];
  List<ShopCategoryModel> categories = [];

  bool isLoading = false;
  String? errorMessage;

  Future<void> fetchHomeData() async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      final results = await Future.wait([
        _homeService.getAllShopCategories(),
        _homeService.getAllShops(),
      ]);

      categories = results[0] as List<ShopCategoryModel>;
      shops = results[1] as List<ShopModel>;
    } catch (error) {
      errorMessage = 'Unable to load home data. Please try again.';
      debugPrint('Home data error: $error');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> refresh() => fetchHomeData();
}
