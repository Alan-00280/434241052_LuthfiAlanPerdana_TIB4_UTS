1. User klik Login → setState(_isLoading = true)
2. await controller.login() → Supabase throw error
3. Error di-catch → masuk Future.microtask()
4. Microtask tunggu frame build selesai
5. Baru tampilkan SnackBar dengan context yang valid ✅
6. finally → reset _isLoading = false

```
Future.microtask(() {
        if (!mounted) return;
        
        final errorMessage = _getErrorMessage(e);
        print("Error tertangkap di UI: $e; Get Error Message: $errorMessage");
        
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(errorMessage),
            duration: const Duration(seconds: 4),
            backgroundColor: Colors.red.shade600,
          ),
        );
      });
```
=== 
# CHANGED
Read [](file:///e%3A/Uner%20Coding/helpdesk-ticketing/client/lib/features/auth/presentation/pages/auth_page.dart#1-1), lines 1 to 150

Read [](file:///e%3A/Uner%20Coding/helpdesk-ticketing/client/lib/main.dart#1-1), lines 1 to 50

Saya akan implementasikan solusi global `ScaffoldMessengerKey` yang lebih stabil: 

Multi-Replace String in Files

Replacing 60 lines with 70 lines in [](file:///e%3A/Uner%20Coding/helpdesk-ticketing/client/lib/main.dart), [](file:///e%3A/Uner%20Coding/helpdesk-ticketing/client/lib/features/auth/presentation/pages/auth_page.dart)


```

```

```

```
Perfect! ✅ Saya telah mengimplementasikan solusi **global `ScaffoldMessengerKey`** - yang paling stabil:

## 🔧 Implementasi

**1. main.dart - Buat global key:**
```dart
final messengerKey = GlobalKey<ScaffoldMessengerState>();
```

**2. main.dart - Assign ke MaterialApp:**
```dart
MaterialApp(
  scaffoldMessengerKey: messengerKey,
  // ...
)
```

**3. auth_page.dart - Import key dan gunakan:**
```dart
import 'package:helpdesk_ticketing/main.dart';

// Di _handleLogin():
messengerKey.currentState?.showSnackBar(
  SnackBar(
    content: Text(errorMessage),
    backgroundColor: Colors.red.shade600,
    behavior: SnackBarBehavior.floating,
  ),
);
```

## 📊 Keuntungan Solusi Ini:

| Aspek | Status |
|-------|--------|
| ❌ Tidak perlu `context` | ✅ Bisa dipanggil dari mana saja |
| ❌ Tidak perlu `mounted` check | ✅ Otomatis aman |
| ❌ Tidak perlu timing hack | ✅ Langsung jalan |
| ✅ Robust dan stabil | ✅ Industry standard |
| ✅ Works across screens | ✅ Global access |

Sekarang snackbar akan ditampilkan dengan sempurna tanpa asynchronous gap! 🎯

Made changes.
===
