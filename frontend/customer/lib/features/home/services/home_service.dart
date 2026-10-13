import 'package:customer/core/network/api_client.dart';
import '../models/shop_model.dart';
import '../models/shop_category_model.dart';

class HomeService {
  Future<List<ShopCategoryModel>> getAllShopCategories() async {
    final response = await ApiClient.dio.get('/shops/categories');

    final List<dynamic> categories = response.data['categories'] ?? [];

    return categories
        .map((json) => ShopCategoryModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }

  Future<List<ShopModel>> getAllShops() async {
    final response = await ApiClient.dio.get('/shops');

    final List<dynamic> shops = response.data['shops'] ?? [];

    return shops
        .map((json) => ShopModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
