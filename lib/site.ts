// Marka ve iletişim bilgileri — tek yerden düzenleyin.
export const site = {
  name: "FlexMedya",
  // Uluslararası formatta, başında + olmadan (ör. 905551234567)
  whatsapp: "905466735501",
  email: "merhaba@flexmedya.com",
};

export const whatsappUrl = (text = "Merhaba, ücretsiz örnek site istiyorum.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
