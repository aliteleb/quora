<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Facades\Filament;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Field;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

/**
 * @property Form $form
 */
class Settings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $view = 'filament.pages.settings';

    protected static ?string $title = 'إعدادات المنصة';

    public Authenticatable $user;

    public ?array $data = [];

    // protected static ?string $navigationGroup = 'إعدادات المنصة';


    public function save(): void
    {

        try {

            $this->callHook('beforeValidate');

            $fields = collect($this->form->getFlatFields(true));
            $fieldsWithNestedFields = $fields->filter(fn(Field $field) => count($field->getChildComponents()) > 0);

            $fieldsWithNestedFields->each(function (Field $fieldWithNestedFields, string $fieldWithNestedFieldsKey) use (&$fields) {
                $fields = $fields->reject(function (Field $field, string $fieldKey) use ($fieldWithNestedFields, $fieldWithNestedFieldsKey) {
                    return Str::startsWith($fieldKey, $fieldWithNestedFieldsKey . '.');
                });
            });

            $data = $fields->mapWithKeys(function (Field $field, string $fieldKey) {
                return [$fieldKey => data_get($this->form->getState(), $fieldKey)];
            })->toArray();

            $this->callHook('afterValidate');

            $this->callHook('beforeSave');

            foreach ($data as $key => $value) {
                Setting::updateOrCreate(
                    ['key' => $key,],
                    ['value' => is_array($value) ? json_encode($value) : $value,]
                );
            }
            cache()->forget('settings');
            Notification::make()->success()->title('تم الحفظ بنجاح')->send();

        } catch (\Exception $e) {
            Notification::make()->danger()->title('حدث خطأ غير متوقع!')->send();
        }
    }

    public function mount(): void
    {
        $this->fillForm();
    }

    protected function fillForm(): void
    {
        $this->user = Filament::getCurrentPanel()->auth()->user();

        $data = Setting::all()->pluck('value', 'key')->toArray();

        $this->callHook('beforeFill');

        // Loop through each item in the array and decode if it's a valid JSON string
        foreach ($data as $key => $value) {
            if ($this->isJson($value)) {
                $data[$key] = json_decode($value, true);
            }
        }

        $this->form->fill($data);

        $this->callHook('afterFill');
    }

    private function isJson(string|null $string): bool
    {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    public function getFormActions(): array
    {
        return [
            Action::make('save')->label('حفظ التفييرات')->submit('save')
        ];
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            Tabs::make()->tabs([
                Tabs\Tab::make('أساسي')->icon('icon-menu')->schema($this->getGeneralSchema()),
                Tabs\Tab::make('تخصيص التصميم')->icon('icon-theme')->schema($this->getThemeSchema()),
                // Tabs\Tab::make('تحسين محركات البحث')->icon('icon-seo')->schema($this->getSEOSchema()),
                Tabs\Tab::make('وضع الصيانة')->icon('icon-maintenance')->schema($this->getMaintenanceSchema()),
            ])->persistTab()->id('setting-tabs')
        ])->statePath('data');
    }

    private function getGeneralSchema(): array
    {
        return [
            Section::make([

                Group::make([
                    FileUpload::make('logo')->label('شعار الموقع')->helperText('150x50')->image()->imageEditor()->disk('public')->fetchFileInformation(false)->downloadable(),
                    FileUpload::make('icon')->label('أيقونة الموقع')->helperText('80x80')->image()->imageEditor()->disk('public')->fetchFileInformation(false)->downloadable(),
                    FileUpload::make('background')->label('خلفية الترويسة')->helperText('252x150')->image()->imageEditor()->disk('public')->fetchFileInformation(false)->downloadable(),
                ])->columns(3)->columnSpanFull(),
                Group::make([
                    TextInput::make('site_name')->placeholder('إسم الموقع')->hiddenLabel()->prefixIcon('icon-caret')->columnSpanFull(),
                ])->columns(2)->columnSpanFull(),

            ])->columns(3)->heading('معلومات أساسية'),
            /*
                       Section::make([
                           TextInput::make('phone')->placeholder('رقم التواصل')->hiddenLabel()->prefixIcon('icon-call'),
                           TextInput::make('email')->placeholder('البريد الإلكتروني')->hiddenLabel()->prefixIcon('icon-email'),
                       ])->columns(2)->heading('الدعم الفني'),


                       Section::make([
                           TextInput::make('facebook')->placeholder('فيسبوك')->hiddenLabel()->prefixIcon('icon-facebook')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('twitter')->placeholder('إكس')->hiddenLabel()->prefixIcon('icon-x')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('whatsapp')->placeholder('واتساب')->hiddenLabel()->prefixIcon('icon-whatsapp')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('instagram')->placeholder('إنستجرام')->hiddenLabel()->prefixIcon('icon-instagram')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('youtube')->placeholder('يوتيوب')->hiddenLabel()->prefixIcon('icon-youtube')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('telegram')->placeholder('تليجرام')->hiddenLabel()->prefixIcon('icon-telegram')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('linkedin')->placeholder('لينكد ان')->hiddenLabel()->prefixIcon('icon-linkedin')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('tiktok')->placeholder('تيك توك')->hiddenLabel()->prefixIcon('icon-tiktok')->extraAttributes(['dir' => 'ltr']),
                       ])->columns(1)->heading('روابط التواصل الإجتماعي'),

                       Section::make([
                           TextInput::make('apple')->placeholder('أبل')->hiddenLabel()->prefixIcon('icon-apple')->extraAttributes(['dir' => 'ltr']),
                           TextInput::make('android')->placeholder('أندرويد')->hiddenLabel()->prefixIcon('icon-android')->extraAttributes(['dir' => 'ltr']),
                       ])->columns(1)->heading('روابط التطبيقات'),
           */
        ];
    }

    private function getSEOSchema(): array
    {
        return [
            Section::make([
                FileUpload::make('social_preview')->image()->imageEditor()->label('معاينة الموقع 300x300')->helperText('معاينة لموقع الويب الخاص بك على مواقع التواصل الاجتماعي المختلفة، قم برفع صورة ترى أنها مناسبة لوصف موقع الويب الخاص بك، لتشجع زوار مواقع التواصل الاجتماعي لزيارة موقع الويب الخاص بك'),
            ])->columns(1)->heading('معاينة الموقع'),

            Section::make([
                Textarea::make('seo_description')->autosize()->placeholder('وصف المنصة')->hiddenLabel()->helperText('الوصف التعريفي عبارة عن مقتطف يصل إلى 155 حرفًا ويلخص محتوى الصفحة.الوصف التعريفي عبارة عن مقتطف يصل إلى 155 حرفًا ويلخص محتوى الصفحة. تظهر صفحتك في نتائج البحث لمحركات البحث في الغالب عندما تكون العبارة التي تم البحث عنها ضمن هذا الوصف. لذا يعد تحسينه أمرًا بالغ الأهمية لتحسين ظهور صفحتك على محركات البحث.'),
            ])->columns(1)->heading('وصف المنصة'),

            Section::make([
                TagsInput::make('seo_tags')->placeholder('كلمات دلالية')->hiddenLabel()->helperText('الكلمات الدلالية هي الكلمات الرئيسية والعبارات في محتوى الويب الخاص بك والتي تجعل من الممكن للأشخاص العثور على موقعك عبر محركات البحث. حيث تعد الكلمات الدلالية هي أحد العناصر الأساسية لتحسين محركات البحث.'),
            ])->columns(1)->heading('كلمات دلالية'),
        ];
    }

    private function getMaintenanceSchema(): array
    {
        return [
            Toggle::make('maintenance')->label('تفعيل وضع الصيانة')->helperText('بعد تفعيل وضع الصيانة ستتمكن لوحدك من الدخول للمتجر والعمل على تجهيزه، بينما العملاء ستظهر لهم صفحة الصيانة. للاطلاع عليها قم بالدخول على منصتك من متصفح آخر أو بتسجيل الخروج من لوحة التحكم'),
            TextInput::make('maintenance_title')->label('العنوان الرئيسي للصيانة')->prefixIcon('icon-heading'),
            Textarea::make('maintenance_title')->label('رسالة الصيانة'),
        ];
    }

    private function getThemeSchema(): array
    {
        return [
            Section::make([
                ColorPicker::make('theme-body-color')->label('لون النص الافتراضي')->hiddenLabel()->placeholder('لون النص الافتراضي'),
                ColorPicker::make('theme-nav_bg_color')->label('لون خلفية الشريط العلوي')->hiddenLabel()->placeholder('لون خلفية الهيدر'),
                ColorPicker::make('theme-primary-text-color')->label('لون النص الأساسي')->hiddenLabel()->placeholder('لون النص الأساسي'),
                ColorPicker::make('theme-secondary-text-color')->label('لون النص الثانوي')->hiddenLabel()->placeholder('لون النص الثانوي'),
                ColorPicker::make('theme-primary-button-color')->label('لون الزر الأساسي')->hiddenLabel()->placeholder('لون الزر الأساسي'),
                ColorPicker::make('theme-input-bg-color')->label('لون خلفية مربع النص')->hiddenLabel()->placeholder('لون خلفية مربع النص'),
                ColorPicker::make('theme-button-border-color')->label('لون حواف الزر')->hiddenLabel()->placeholder('لون حواف الزر'),
                ColorPicker::make('theme-button-bg-color-hover')->label('لون خلفية الزر عند الوقوف عليه')->hiddenLabel()->placeholder('لون خلفية الزر عند الوقوف عليه'),
            ])->columns(1)->heading('تصميم الموقع'),
        ];
    }


}
