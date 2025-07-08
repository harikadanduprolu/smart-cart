import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Share2, ShoppingCart, Plus, Search, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const favoriteItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1199.00,
    originalPrice: 1299.00,
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    price: 89.99,
    originalPrice: 120.00,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    category: 'Fashion'
  },
  {
    id: 3,
    name: 'KitchenAid Stand Mixer',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.9,
    reviews: 2156,
    inStock: false,
    category: 'Home'
  },
  {
    id: 4,
    name: 'Samsung 55" 4K TV',
    price: 449.99,
    originalPrice: 599.99,
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.7,
    reviews: 634,
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Dyson V15 Vacuum',
    price: 549.99,
    originalPrice: 649.99,
    image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.8,
    reviews: 1089,
    inStock: true,
    category: 'Home'
  },
  {
    id: 6,
    name: 'Apple AirPods Pro',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    rating: 4.9,
    reviews: 3421,
    inStock: true,
    category: 'Electronics'
  }
];

const wishLists = [
  { id: 1, name: 'Holiday Gifts', itemCount: 12, image: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 2, name: 'Home Improvement', itemCount: 8, image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 3, name: 'Tech Wishlist', itemCount: 15, image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' }
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('items');
  const [favorites, setFavorites] = useState(favoriteItems);

  const toggleFavorite = (itemId: number) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const addToCart = (item: any) => {
    // Add to cart logic
    console.log('Added to cart:', item.name);
  };

  const shareItem = (item: any) => {
    // Share logic
    console.log('Sharing:', item.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'items' && styles.activeTab]}
          onPress={() => setSelectedTab('items')}
        >
          <Text style={[styles.tabText, selectedTab === 'items' && styles.activeTabText]}>
            Items ({favorites.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'lists' && styles.activeTab]}
          onPress={() => setSelectedTab('lists')}
        >
          <Text style={[styles.tabText, selectedTab === 'lists' && styles.activeTabText]}>
            Lists ({wishLists.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {selectedTab === 'items' ? (
          <>
            {favorites.length > 0 ? (
              <View style={styles.itemsGrid}>
                {favorites.map((item) => (
                  <View key={item.id} style={styles.favoriteCard}>
                    <View style={styles.favoriteImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                      <TouchableOpacity 
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item.id)}
                      >
                        <Heart size={16} color="#ef4444" fill="#ef4444" />
                      </TouchableOpacity>
                      {!item.inStock && (
                        <View style={styles.outOfStockBadge}>
                          <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.favoriteInfo}>
                      <Text style={styles.favoriteCategory}>{item.category}</Text>
                      <Text style={styles.favoriteName} numberOfLines={2}>{item.name}</Text>
                      
                      <View style={styles.favoriteRating}>
                        <Text style={styles.favoriteStars}>⭐⭐⭐⭐⭐</Text>
                        <Text style={styles.favoriteReviews}>({item.reviews})</Text>
                      </View>
                      
                      <View style={styles.favoritePricing}>
                        <Text style={styles.favoritePrice}>${item.price.toFixed(2)}</Text>
                        {item.originalPrice > item.price && (
                          <Text style={styles.favoriteOriginalPrice}>${item.originalPrice.toFixed(2)}</Text>
                        )}
                      </View>
                      
                      <View style={styles.favoriteActions}>
                        <TouchableOpacity 
                          style={[styles.addToCartButton, !item.inStock && styles.disabledButton]}
                          onPress={() => addToCart(item)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart size={16} color={item.inStock ? "#ffffff" : "#9ca3af"} />
                          <Text style={[styles.addToCartText, !item.inStock && styles.disabledButtonText]}>
                            {item.inStock ? 'Add to Cart' : 'Notify Me'}
                          </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={styles.shareButton}
                          onPress={() => shareItem(item)}
                        >
                          <Share2 size={16} color="#0071ce" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Heart size={64} color="#d1d5db" />
                <Text style={styles.emptyStateTitle}>No favorites yet</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Start adding items to your favorites to see them here
                </Text>
                <TouchableOpacity 
                  style={styles.shopNowButton}
                  onPress={() => router.push('/search')}
                >
                  <Text style={styles.shopNowButtonText}>Start Shopping</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Wish Lists */}
            <View style={styles.listsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Lists</Text>
                <TouchableOpacity style={styles.createListButton}>
                  <Plus size={16} color="#0071ce" />
                  <Text style={styles.createListText}>Create List</Text>
                </TouchableOpacity>
              </View>
              
              {wishLists.map((list) => (
                <TouchableOpacity key={list.id} style={styles.listCard}>
                  <Image source={{ uri: list.image }} style={styles.listImage} />
                  <View style={styles.listInfo}>
                    <Text style={styles.listName}>{list.name}</Text>
                    <Text style={styles.listItemCount}>{list.itemCount} items</Text>
                  </View>
                  <View style={styles.listActions}>
                    <TouchableOpacity style={styles.listActionButton}>
                      <Share2 size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0071ce',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#0071ce',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  itemsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  favoriteCard: {
    width: (width - 48) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteImageContainer: {
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  outOfStockBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  outOfStockText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteInfo: {
    padding: 12,
  },
  favoriteCategory: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 6,
    lineHeight: 18,
  },
  favoriteRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  favoriteStars: {
    fontSize: 12,
    marginRight: 4,
  },
  favoriteReviews: {
    fontSize: 12,
    color: '#64748b',
  },
  favoritePricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginRight: 8,
  },
  favoriteOriginalPrice: {
    fontSize: 12,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  favoriteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#f1f5f9',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  shareButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listsSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  createListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createListText: {
    color: '#0071ce',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  listCard: {
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
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  listItemCount: {
    fontSize: 14,
    color: '#64748b',
  },
  listActions: {
    flexDirection: 'row',
    gap: 8,
  },
  listActionButton: {
    padding: 8,
  },
});