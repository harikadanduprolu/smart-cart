import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, ShoppingCart, Clock, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const recentOrders = [
  {
    id: 1,
    date: '2024-01-15',
    itemCount: 5,
    total: 127.89,
    items: [
      { 
        id: 1, 
        name: 'iPhone 15 Pro Max', 
        price: 1199.00, 
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
        quantity: 1,
        inStock: true
      },
      { 
        id: 2, 
        name: 'AirPods Pro', 
        price: 249.99, 
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
        quantity: 1,
        inStock: true
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-12',
    itemCount: 12,
    total: 89.47,
    items: [
      { 
        id: 3, 
        name: 'Bananas, 3 lbs', 
        price: 1.98, 
        image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
        quantity: 2,
        inStock: true
      },
      { 
        id: 4, 
        name: 'Milk, Whole, 1 Gallon', 
        price: 3.68, 
        image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
        quantity: 1,
        inStock: true
      },
      { 
        id: 5, 
        name: 'Bread, White, 20oz', 
        price: 1.00, 
        image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
        quantity: 2,
        inStock: false
      }
    ]
  }
];

const frequentlyOrdered = [
  { 
    id: 6, 
    name: 'Greek Yogurt, 32oz', 
    price: 5.48, 
    image: 'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    lastOrdered: '3 days ago',
    orderCount: 8,
    inStock: true
  },
  { 
    id: 7, 
    name: 'Chicken Breast, 2.5 lbs', 
    price: 7.96, 
    image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    lastOrdered: '1 week ago',
    orderCount: 12,
    inStock: true
  },
  { 
    id: 8, 
    name: 'Spinach, Fresh, 5oz', 
    price: 2.48, 
    image: 'https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    lastOrdered: '5 days ago',
    orderCount: 6,
    inStock: true
  }
];

export default function ReorderScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const reorderEntireOrder = (order: any) => {
    const availableItems = order.items.filter((item: any) => item.inStock);
    setCart([...cart, ...availableItems]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reorder</Text>
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart size={24} color="#0071ce" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <Text style={styles.sectionSubtitle}>Reorder items from your past purchases</Text>
          
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderDate}>
                    {new Date(order.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.orderDetails}>
                    {order.itemCount} items • ${order.total.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.reorderAllButton}
                  onPress={() => reorderEntireOrder(order)}
                >
                  <Text style={styles.reorderAllText}>Reorder All</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.orderItems}>
                {order.items.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <View style={styles.itemImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                      {!item.inStock && (
                        <View style={styles.outOfStockOverlay}>
                          <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                      <TouchableOpacity 
                        style={[styles.addItemButton, !item.inStock && styles.disabledButton]}
                        onPress={() => addToCart(item)}
                        disabled={!item.inStock}
                      >
                        <Plus size={16} color={item.inStock ? "#0071ce" : "#9ca3af"} />
                        <Text style={[styles.addItemText, !item.inStock && styles.disabledText]}>
                          {item.inStock ? 'Add' : 'Unavailable'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>

        {/* Frequently Ordered */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Ordered</Text>
          <Text style={styles.sectionSubtitle}>Items you order most often</Text>
          
          {frequentlyOrdered.map((item) => (
            <View key={item.id} style={styles.frequentItem}>
              <Image source={{ uri: item.image }} style={styles.frequentItemImage} />
              <View style={styles.frequentItemInfo}>
                <Text style={styles.frequentItemName}>{item.name}</Text>
                <Text style={styles.frequentItemPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.frequentItemMeta}>
                  <View style={styles.orderHistory}>
                    <Clock size={12} color="#64748b" />
                    <Text style={styles.lastOrderedText}>{item.lastOrdered}</Text>
                  </View>
                  <View style={styles.orderCount}>
                    <Star size={12} color="#ffc220" />
                    <Text style={styles.orderCountText}>Ordered {item.orderCount} times</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.quickAddButton}
                onPress={() => addToCart(item)}
              >
                <Plus size={20} color="#0071ce" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Smart Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Might Also Need</Text>
          <Text style={styles.sectionSubtitle}>Based on your shopping patterns</Text>
          
          <View style={styles.suggestionsGrid}>
            {[
              { name: 'Eggs, Large, 18 count', price: 2.88, image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
              { name: 'Butter, Unsalted, 1 lb', price: 3.98, image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
              { name: 'Avocados, 4 pack', price: 4.98, image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
              { name: 'Orange Juice, 64oz', price: 3.48, image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.suggestionCard}>
                <Image source={{ uri: item.image }} style={styles.suggestionImage} />
                <Text style={styles.suggestionName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.suggestionPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.suggestionAddButton}
                  onPress={() => addToCart(item)}
                >
                  <Plus size={16} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartItemCount}>{cart.length} items in cart</Text>
            <Text style={styles.cartTotal}>
              ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.viewCartButton}>
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  orderDetails: {
    fontSize: 14,
    color: '#64748b',
  },
  reorderAllButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reorderAllText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  orderItems: {
    marginHorizontal: -8,
  },
  orderItem: {
    width: 140,
    marginHorizontal: 8,
  },
  itemImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 8,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 6,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#f8fafc',
  },
  addItemText: {
    color: '#0071ce',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  disabledText: {
    color: '#9ca3af',
  },
  frequentItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  frequentItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  frequentItemInfo: {
    flex: 1,
  },
  frequentItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  frequentItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 6,
  },
  frequentItemMeta: {
    gap: 4,
  },
  orderHistory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastOrderedText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  orderCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCountText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  quickAddButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 8,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 18,
  },
  suggestionPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 8,
  },
  suggestionAddButton: {
    backgroundColor: '#0071ce',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
  },
  cartSummary: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartInfo: {
    flex: 1,
  },
  cartItemCount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0071ce',
  },
  viewCartButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  viewCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});