// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tech_support_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(TechSupportList)
final techSupportListProvider = TechSupportListProvider._();

final class TechSupportListProvider
    extends $AsyncNotifierProvider<TechSupportList, List<TicketUserRef>> {
  TechSupportListProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'techSupportListProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$techSupportListHash();

  @$internal
  @override
  TechSupportList create() => TechSupportList();
}

String _$techSupportListHash() => r'd1f6f16a7b22b480daa7105caea49165100c9e83';

abstract class _$TechSupportList extends $AsyncNotifier<List<TicketUserRef>> {
  FutureOr<List<TicketUserRef>> build();
  @$mustCallSuper
  @override
  void runBuild() {
    final ref =
        this.ref as $Ref<AsyncValue<List<TicketUserRef>>, List<TicketUserRef>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<TicketUserRef>>, List<TicketUserRef>>,
              AsyncValue<List<TicketUserRef>>,
              Object?,
              Object?
            >;
    element.handleCreate(ref, build);
  }
}
