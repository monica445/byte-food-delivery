class ShopCategoryModel {
  final String id;
  final String name;
  final String slug;
  final String? description;
  final String? imageUrl;

  const ShopCategoryModel({
    required this.id,
    required this.name,
    required this.slug,
    this.description,
    this.imageUrl,
  });

  factory ShopCategoryModel.fromJson(Map<String, dynamic> json) {
    return ShopCategoryModel(
      id: json['id'] as String,
      name: json['name'] as String,
      slug: json['slug'] as String,
      description: json['description'] as String?,
      imageUrl: json['imageUrl'] as String?,
    );
  }
}
