export interface MenuItem {
  id: number;
  name: string;
  englishName?: string;
  description?: string;
  price?: string;
  category: string;
  subcategory?: string;
  image: string;
  isNew: boolean;
  isHot: boolean;
  isIce: boolean;
  spiceLevel?: number;
}

const menuImage = (filename: string) =>
  `/assets/HongdaePocha/HongdaePocha_Menu_Image/${filename}`;
const legacyImage = (filename: string) =>
  `/assets/HongdaePocha/HongdaePocha_image/${filename}`;
const newMenuImage = (filename: string) =>
  `/assets/HongdaePocha/HongdaePocha_Menu_Image_2027/${filename}`;

const englishFoodNames: Record<number, string> = {
  1: "Soy Glazed Wagyu Brisket",
  2: "Wagyu Oyster Blade",
  3: "Wagyu Bavette",
  4: "Soy Marinated Wagyu Karubi Plate",
  5: "LA Galbi",
  6: "Wagyu Rib Fingers",
  7: "Garlic Wagyu Jumulleok",
  8: "Pork Belly",
  9: "Extra Fatty Pork Belly",
  10: "Pork Scotch Fillet",
  11: "Pork Jowl",
  12: "Marinated Pork Galbi",
  13: "Wagyu Short Rib",
  14: "Wagyu Chuck Tail Flap",
  15: "Wagyu Tenderloin Side Strap",
  16: "Garlic Patagonian Red Prawns",
  17: "Lettuce Wraps",
  18: "Assorted Grilled Mushrooms",
  19: "Soy Pickled Garlic Leaves",
  20: "Sesame Oil Confit Garlic",
  21: "Spicy Spring Onion Salad",
  22: "Fermented Fish Dipping Sauce",
  23: "Beef Tartare Hash Browns",
  24: "Korean Steamed Egg",
  25: "Korean Beef Tartare",
  26: "Prawn Minari Pancake",
  27: "Tteokbokki",
  28: "Rose Tteokbokki",
  29: "Sotteok Sotteok",
  30: "Wagyu Doenjang Stew",
  31: "Pork Kimchi Stew",
  32: "Seafood Silken Tofu Stew",
  33: "Vegetable Bibimbap",
  34: "Wagyu Beef Tartare Bibimbap",
  35: "Cold Broth Naengmyeon",
  36: "Spicy Bibim Naengmyeon",
  37: "Spicy Stir-Fried Pork",
  38: "Pocha Udon",
  39: "Wagyu Chapagetti",
  40: "Sweet Potato Cheese Buldak",
  41: "Scorched Rice Wagyu Doenjang Hot Pot",
  42: "Spam Kimchi Hot Pot",
};

const item = (
  id: number,
  name: string,
  description: string,
  price: string,
  category: string,
  subcategory: string | undefined,
  image = "",
): MenuItem => ({
  id,
  name,
  englishName: englishFoodNames[id],
  description,
  price,
  category,
  subcategory,
  image,
  isNew: false,
  isHot: false,
  isIce: false,
});

export const menuData: MenuItem[] = [
  // 2027 Summer food menu — BBQ Meats
  item(2, "부채살", "Oyster blade, Wagyu MBS6-7 (DF, GF)", "$19.90", "BBQ Meats", undefined, newMenuImage("1.webp")),
  item(3, "치마살", "Bavette, Wagyu MBS9+ (DF, GF)", "$19.90", "BBQ Meats", undefined, legacyImage("Chimasal.jpg")),
  item(4, "양념 업진살", "Soy marinated karubi plate, Wagyu MBS9+ (DF)", "$19.90", "BBQ Meats", undefined, menuImage("BandiView_5.webp")),
  item(5, "LA갈비", "Galbi sauce marinated LA cut ribs, Grass fed Black Angus (200g) (DF)", "$19.90", "BBQ Meats", undefined, newMenuImage("6.webp")),
  item(1, "우삼겹", "Soy glazed thin Wagyu brisket (DF)", "$19.90", "BBQ Meats", undefined),

  item(6, "갈비살", "Rib fingers, Wagyu MBS4-5 (DF, GF)", "$24.90", "BBQ Meats", undefined, legacyImage("galbisal.jpg")),
  item(7, "마늘주물럭", "Garlic marinated rib finger jumuluk, Wagyu MBS4-5 (DF, GF)", "$24.90", "BBQ Meats", undefined, newMenuImage("3.webp")),
  item(8, "삼겹살", "Free ranged pork belly (DF, GF)", "$24.90", "BBQ Meats", undefined, newMenuImage("7.webp")),
  item(9, "미식가용 삼겹살", "Free ranged extra fatty pork belly (limited) (DF, GF)", "$24.90", "BBQ Meats", undefined, newMenuImage("4.webp")),
  item(10, "목살", "Free ranged pork scotch fillet (DF, GF)", "$24.90", "BBQ Meats", undefined, menuImage("BandiView_69.webp")),
  item(11, "항정살", "Pork jowl (DF, GF)", "$24.90", "BBQ Meats", undefined, newMenuImage("8.webp")),
  item(12, "돼지갈비", "Free ranged pork rib meat marinated with soy & apple (DF)", "$24.90", "BBQ Meats", undefined, newMenuImage("13.webp")),

  item(13, "꽃살", "Short rib meat, Wagyu MBS6-7 (DF, GF)", "$34.90", "BBQ Meats", undefined, newMenuImage("5.webp")),
  item(14, "살치살", "Chuck tail flap, Wagyu MBS6-7 (DF, GF)", "$34.90", "BBQ Meats", undefined, newMenuImage("2.webp")),
  item(15, "안심추리", "Full blood Wagyu tenderloin side strap (GF, DF)", "$34.90", "BBQ Meats", undefined),
  item(16, "새우구이", "Garlic marinated Patagonian red prawn (I) (200g) (GF, DF)", "$34.90", "BBQ Meats", undefined, newMenuImage("14.webp")),

  // K-BBQ's Friends
  item(17, "쌈", "Lettuce wraps (GF, DF, VG)", "$5", "K-BBQ's Friends", undefined, legacyImage("Ssam.jpg")),
  item(18, "버섯구이", "Assorted mushrooms with garlic soy dressing (DF, VG)", "$16", "K-BBQ's Friends", undefined, menuImage("BandiView_50.webp")),
  item(19, "명이나물", "Soy pickled garlic leaf (DF, VG)", "$7", "K-BBQ's Friends", undefined, menuImage("BandiView_51.webp")),
  item(20, "참기름마늘구이", "Confit garlic with sesame oil (GF, DF, VG)", "$5", "K-BBQ's Friends", undefined, newMenuImage("26.webp")),
  item(21, "파무침", "Spring onion salad with sesame oil vinaigrette and gochugaru (GF, DF, VG)", "$9", "K-BBQ's Friends", undefined),
  item(22, "갈치속젓", "Korean fermented fish dipping sauce (best with pork!) (I) (GF, DF)", "$6", "K-BBQ's Friends", undefined),

  // Sides
  item(23, "육회 해시브라운", "Jinju style spicy beef tartare on golden hash brown, 2PCS (DF)", "$21", "Sides", undefined, newMenuImage("17.webp")),
  item(24, "계란찜", "Korean steamed egg (GF, DF)", "$19", "Sides", undefined, legacyImage("poktanegg.jpg")),
  item(25, "육회", "Korean style raw beef with rocket salad (GF, DF)", "$34", "Sides", undefined, menuImage("BandiView_29.webp")),
  item(26, "새우 미나리전", "Korean water parsley pancake with green chilli and prawns (I) (DF)", "$27", "Sides", undefined, legacyImage("saewoominarijeon.jpg")),
  item(27, "떡볶이", "Tteokbokki, spicy gochujang rice cakes (I) (DF)", "$16", "Sides", undefined, newMenuImage("23.webp")),
  item(28, "로제떡볶이", "Rosé Tteokbokki, creamy gochujang rice cakes with cheese kransky (I)", "$25", "Sides", undefined, newMenuImage("22.webp")),
  item(29, "소떡소떡", "Rice cake, cheese kransky and potato gem in gochujang sauce", "$23", "Sides", undefined, newMenuImage("18.webp")),

  // Bowls, Plates & Hot Pots
  item(30, "소고기 된장찌개", "Doenjang stew with Wagyu, tofu and a bowl of rice (DF)", "$23", "Bowls, Plates & Hot Pots", undefined, menuImage("BandiView_12.webp")),
  item(31, "돼지고기 김치찌개", "Kimchi stew with pork, tofu and a bowl of rice (DF)", "$28", "Bowls, Plates & Hot Pots", undefined, menuImage("BandiView_13.webp")),
  item(32, "해물 순두부찌개", "Silken tofu stew with seafood and a bowl of rice (I) (DF)", "$28", "Bowls, Plates & Hot Pots", undefined, newMenuImage("15.webp")),
  item(33, "양푼비빔밥", "Bibimbap with fried egg and vegetables (DF, V)", "$24", "Bowls, Plates & Hot Pots", undefined, menuImage("BandiView_18.webp")),
  item(34, "육회비빔밥", "Bibimbap with raw 9+ Wagyu and vegetables (DF)", "$29", "Bowls, Plates & Hot Pots", undefined, menuImage("BandiView_21.webp")),
  item(35, "물냉면", "Naengmyeon, Korean noodle with cold broth (DF)", "$22", "Bowls, Plates & Hot Pots", undefined, newMenuImage("27.webp")),
  item(36, "비빔냉면", "Bibim-Naengmyeon, Korean cold noodle with spicy sauce (DF)", "$24", "Bowls, Plates & Hot Pots", undefined, newMenuImage("28.webp")),
  item(37, "제육볶음", "Spicy stir fried pork belly on sizzling plate and a bowl of rice (DF)", "$26", "Bowls, Plates & Hot Pots", undefined, legacyImage("jeyuk.jpg")),
  item(38, "포차우동", "Korean pocha style udon noodle soup with fishcake (I) (DF)", "$26", "Bowls, Plates & Hot Pots", undefined),
  item(39, "우삼겹짜파게티", "Chapagetti with thin Wagyu brisket, chilli and garlic (DF)", "$25", "Bowls, Plates & Hot Pots", undefined, newMenuImage("19.webp")),
  item(40, "고구마치즈불닭", "Sizzling chilli cheese chicken with sweet potato cream (for 2-3)", "$52", "Bowls, Plates & Hot Pots", undefined, newMenuImage("20.webp")),
  item(41, "누룽지차돌된장술밥", "Doenjang hot pot with Wagyu and scorched rice (DF) (for 2-3)", "$49", "Bowls, Plates & Hot Pots", undefined, newMenuImage("21.webp")),
  item(42, "스팸김치전골", "Kimchi hot pot with spam, pork and tofu (DF) (for 2-3)", "$59", "Bowls, Plates & Hot Pots", undefined, newMenuImage("16.webp")),

  // Drinks are unchanged because the supplied document only updates the food menu.
  { id: 101, name: "처음처럼 (Chumchurum)", category: "DRINKS", subcategory: "SOJU", image: legacyImage("Chumchurum.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 102, name: "새로 (Saero)", category: "DRINKS", subcategory: "SOJU", image: legacyImage("sero.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 103, name: "선양 (Sunyang)", category: "DRINKS", subcategory: "SOJU", image: "", isNew: false, isHot: false, isIce: false },
  { id: 104, name: "복숭아 (Peach)", category: "DRINKS", subcategory: "SOJU", image: legacyImage("soonpeach.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 105, name: "청포도 (Green grape)", category: "DRINKS", subcategory: "SOJU", image: legacyImage("soongrape.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 106, name: "요거트 (Yogurt)", category: "DRINKS", subcategory: "SOJU", image: legacyImage("soonyogurt.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 107, name: "카스 (Cass)", category: "DRINKS", subcategory: "BEER", image: legacyImage("Cass.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 108, name: "테라 (Terra)", category: "DRINKS", subcategory: "BEER", image: "", isNew: false, isHot: false, isIce: false },
  { id: 109, name: "크러쉬 (Krush)", category: "DRINKS", subcategory: "BEER", image: legacyImage("krush.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 110, name: "지평 (Jipyeong makgeolli)", category: "DRINKS", subcategory: "MAKGEOLLI", image: legacyImage("jipungMakgeolli.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 111, name: "장수 (Jangsoo draft makgeolli)", category: "DRINKS", subcategory: "MAKGEOLLI", image: legacyImage("Makgeolli.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 112, name: "알밤 (Chestnut makgeolli)", category: "DRINKS", subcategory: "MAKGEOLLI", image: legacyImage("Chestnut.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 113, name: "별빛청하 (Chungha sparkling wine)", category: "DRINKS", subcategory: "KOREAN WINE", image: legacyImage("sparkingwine.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 114, name: "복분자 (Bokbunja)", category: "DRINKS", subcategory: "KOREAN WINE", image: legacyImage("bokbunja.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 115, name: "Princess peach", category: "DRINKS", subcategory: "Cocktails", image: "", isNew: false, isHot: false, isIce: false },
  { id: 116, name: "Go banana's", category: "DRINKS", subcategory: "Cocktails", image: "", isNew: false, isHot: false, isIce: false },
  { id: 117, name: "Yuja drop", category: "DRINKS", subcategory: "Cocktails", image: "", isNew: false, isHot: false, isIce: false },
  { id: 118, name: "밀키스 (Milkis)", category: "DRINKS", subcategory: "SOFT DRINKS", image: legacyImage("creamsoda.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 119, name: "봉봉 (Bongbong grape juice)", category: "DRINKS", subcategory: "SOFT DRINKS", image: legacyImage("bongbong.jpg"), isNew: false, isHot: false, isIce: false },
  { id: 120, name: "갈아만든배 (Pear juice)", category: "DRINKS", subcategory: "SOFT DRINKS", image: legacyImage("LDH.jpg"), isNew: false, isHot: false, isIce: false },
];
