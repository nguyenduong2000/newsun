
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { ControlledInput } from '@/components/form/controlled-input';
import { ControlledTextarea } from '@/components/form/controlled-textarea';
import { ControlledSelect } from '@/components/form/controlled-select';
import { ControlledRadioGroup } from '@/components/form/controlled-radio-group';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useAddress } from '@/hooks/useAddress';

const checkoutFormSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ và tên.'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ.'),
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  city: z.string({ required_error: 'Vui lòng chọn Tỉnh/Thành phố.' }),
  district: z.string({ required_error: 'Vui lòng chọn Quận/Huyện.' }),
  ward: z.string({ required_error: 'Vui lòng chọn Xã/Phường.' }),
  address: z.string().min(5, 'Vui lòng nhập địa chỉ chi tiết.'),
  paymentMethod: z.enum(['bank', 'cod_store', 'cod_home']),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, getCartTotal } = useCart();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      paymentMethod: 'bank',
    },
  });

  const {
    cities,
    districts,
    wards,
    setCityCode,
    setDistrictCode,
    loadingCities,
    loadingDistricts,
    loadingWards,
  } = useAddress();

  const selectedCityCode = form.watch('city');
  const selectedDistrictCode = form.watch('district');

  useEffect(() => {
    if (selectedCityCode) {
      setCityCode(selectedCityCode);
      form.setValue('district', '');
      form.setValue('ward', '');
    }
  }, [selectedCityCode, setCityCode, form]);

  useEffect(() => {
    if (selectedDistrictCode) {
      setDistrictCode(selectedDistrictCode);
       form.setValue('ward', '');
    }
  }, [selectedDistrictCode, setDistrictCode, form]);

  async function onSubmit(values: CheckoutFormValues) {
    setIsSubmitting(true);

    const fullAddress = {
        ...values,
        city: cities.find(c => c.value === values.city)?.label,
        district: districts.find(d => d.value === values.district)?.label,
        ward: wards.find(w => w.value === values.ward)?.label,
    }

    console.log('Submitting Order:', {
      customerInfo: fullAddress,
      orderItems: cartItems,
      total: getCartTotal(),
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: 'Đặt hàng thành công!',
      description: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ để xác nhận đơn hàng.',
    });
    // Here you would typically clear the cart and redirect the user.
    // clearCart();
    // router.push('/thank-you');
    setIsSubmitting(false);
  }
  
  const FormSectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-4">{title}</h2>
  );

  return (
    <div className="container-fluid mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
          
          {/* Left & Middle Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Customer Info */}
                <div className="space-y-4">
                  <FormSectionTitle title="THÔNG TIN MUA HÀNG" />
                  <ControlledInput control={form.control} name="name" label="Họ và tên *" />
                  <div className="grid grid-cols-2 gap-4">
                    <ControlledInput control={form.control} name="phone" label="Số điện thoại *" />
                    <ControlledInput control={form.control} name="email" label="Địa chỉ email *" />
                  </div>
                  <ControlledSelect
                    control={form.control}
                    name="city"
                    label="Tỉnh/Thành phố *"
                    placeholder={loadingCities ? "Đang tải..." : "Chọn Tỉnh/Thành phố"}
                    options={cities}
                    disabled={loadingCities}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <ControlledSelect
                        control={form.control}
                        name="district"
                        label="Quận/Huyện *"
                        placeholder={loadingDistricts ? "Đang tải..." : "Chọn Quận/Huyện"}
                        options={districts}
                        disabled={!selectedCityCode || loadingDistricts}
                    />
                     <ControlledSelect
                        control={form.control}
                        name="ward"
                        label="Xã/Phường/Thị trấn *"
                        placeholder={loadingWards ? "Đang tải..." : "Chọn Xã/Phường"}
                        options={wards}
                        disabled={!selectedDistrictCode || loadingWards}
                    />
                  </div>
                  <ControlledInput control={form.control} name="address" label="Địa chỉ của bạn *" placeholder="Nhập địa chỉ cụ thể"/>
                </div>

                {/* Middle Column: Payment & Notes */}
                <div className="space-y-8">
                  <div>
                    <FormSectionTitle title="HÌNH THỨC THANH TOÁN" />
                    <ControlledRadioGroup
                        control={form.control}
                        name="paymentMethod"
                        label=""
                        options={[
                            { value: 'bank', label: 'Chuyển khoản qua máy ATM & Ngân hàng' },
                            { value: 'cod_store', label: 'Nhận hàng và thanh toán tại NEWSUN' },
                            { value: 'cod_home', label: 'Giao hàng và thu tiền tại nhà' },
                        ]}
                    />
                  </div>
                  <div>
                     <FormSectionTitle title="THÔNG TIN THÊM" />
                     <ControlledTextarea
                        control={form.control}
                        name="notes"
                        label="Ghi chú đơn hàng (tuỳ chọn)"
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                        rows={5}
                    />
                  </div>
                </div>
            </div>
          </div>
          
          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 bg-muted/30 sticky top-24">
              <FormSectionTitle title={`ĐƠN HÀNG (${cartItems.length} sản phẩm)`} />
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                 {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 text-sm">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md border p-1" data-ai-hint="kitchen appliance" />
                        <div className="flex-grow">
                            <p className="font-medium line-clamp-2">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.models?.[1] || 'Standard'}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-semibold">{formatPrice(item.price * item.quantity)}đ</p>
                           <p className="text-xs text-muted-foreground">SL: {item.quantity}</p>
                        </div>
                    </div>
                 ))}
              </div>
              <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{formatPrice(getCartTotal())}đ</span>
                </div>
                 <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold">Miễn phí</span>
                </div>
                 <div className="pt-2">
                    <label className="text-sm font-medium">Khuyến mãi</label>
                    <div className="flex gap-2 mt-1">
                        <Input placeholder="Nhập mã giảm giá"/>
                        <Button variant="secondary" className="bg-gray-300 hover:bg-gray-400">Sử dụng</Button>
                    </div>
                 </div>
                 <div className="flex justify-between border-t pt-4 mt-2 font-bold text-lg">
                    <span>Thành tiền</span>
                    <span className="text-primary">{formatPrice(getCartTotal())}đ</span>
                </div>
              </div>
               <p className="text-xs text-muted-foreground mt-4">
                  Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong <Link href="#" className="text-primary hover:underline">chính sách riêng tư</Link> của chúng tôi.
               </p>
               <Button type="submit" size="lg" className="w-full mt-4 h-12 text-lg" disabled={isSubmitting}>
                 {isSubmitting ? "Đang xử lý..." : "ĐẶT HÀNG"}
               </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
