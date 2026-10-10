class AuthUser {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String role;

  const AuthUser({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    required this.role,
  });

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      phone: json['phone'] as String?,
      role: json['role'] as String,
    );
  }
}
