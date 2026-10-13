class ShopModel {
  final String id;
  final String name;
  final String? description;
  final String? logoUrl;
  final String? coverUrl;
  final String addressText;
  final bool isOpen;
  final bool isApproved;
  final String? shopCategoryId;
  final String? shopCategoryName;

  const ShopModel({
    required this.id,
    required this.name,
    this.description,
    this.logoUrl,
    this.coverUrl,
    required this.addressText,
    required this.isOpen,
    required this.isApproved,
    this.shopCategoryId,
    this.shopCategoryName,
  });

  factory ShopModel.fromJson(Map<String, dynamic> json) {
    final category = json['shopCategory'];

    return ShopModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      logoUrl: json['logoUrl'] as String?,
      coverUrl: json['coverUrl'] as String?,
      addressText: json['addressText'] as String? ?? '',
      isOpen: json['isOpen'] as bool? ?? false,
      isApproved: json['isApproved'] as bool? ?? false,
      shopCategoryId: json['shopCategoryId'] as String?,
      shopCategoryName: category is Map<String, dynamic>
          ? category['name'] as String?
          : null,
    );
  }
}
