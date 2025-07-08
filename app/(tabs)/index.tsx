import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, MapPin, Sparkles, ShoppingBasket, Heart, Clock, TrendingUp, Package, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const featuredDeals = [
  {
    id: 1,
    title: 'Fresh Groceries',
    subtitle: 'Up to 30% off',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    badge: 'Limited Time'
  },
  {
    id: 2,
    title: 'Electronics',
    subtitle: 'Starting at $99',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    badge: 'Hot Deal'
  },
  {
    id: 3,
    title: 'Home & Garden',
    subtitle: 'Save big today',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    badge: 'New'
  }
];

const quickActions = [
  { icon: ShoppingBasket, label: 'My Baskets', color: '#0071ce', route: '/baskets' },
  { icon: Clock, label: 'Reorder', color: '#ff6b35', route: '/reorder' },
  { icon: Heart, label: 'Lists', color: '#e91e63', route: '/favorites' },
  { icon: Package, label: 'Track Orders', color: '#4caf50', route: '/orders' }
];

const categories = [
  { name: 'Grocery', image: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { name: 'Fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { name: 'Home', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { name: 'Beauty', image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { name: 'Sports', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' }
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.locationContainer}>
              <MapPin size={18} color="#0071ce" />
              <Text style={styles.locationText}>Supercenter • San Jose, CA</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={22} color="#374151" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
            <Search size={20} color="#6b7280" />
            <Text style={styles.searchPlaceholder}>Search everything at Walmart</Text>
            <View style={styles.searchMic}>
              <Text style={styles.searchMicText}>🎤</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Suggestion Banner */}
        <TouchableOpacity 
          style={styles.aiSuggestionBanner}
          onPress={() => router.push('/ai-suggestion')}
        >
          <View style={styles.aiSuggestionContent}>
            <View style={styles.aiIconContainer}>
              <Sparkles size={24} color="#ffc220" />
            </View>
            <View style={styles.aiSuggestionText}>
              <Text style={styles.aiSuggestionTitle}>Smart Basket Ready!</Text>
              <Text style={styles.aiSuggestionSubtitle}>We've created a basket based on your recent orders</Text>
            </View>
            <View style={styles.aiArrow}>
              <Text style={styles.aiArrowText}>→</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quickActionItem}
                onPress={() => router.push(action.route)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Deals */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {featuredDeals.map((deal) => (
              <TouchableOpacity key={deal.id} style={styles.featuredItem}>
                <Image source={{ uri: deal.image }} style={styles.featuredImage} />
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>{deal.badge}</Text>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{deal.title}</Text>
                  <Text style={styles.featuredSubtitle}>{deal.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Now */}
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.trendingHeader}>
              <TrendingUp size={20} color="#ff6b35" />
              <Text style={styles.sectionTitle}>Trending Now</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.trendingItem}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
                  style={styles.trendingImage}
                />
                <View style={styles.trendingContent}>
                  <Text style={styles.trendingTitle}>Trending Product {item}</Text>
                  <Text style={styles.trendingPrice}>$19.99</Text>
                  <View style={styles.trendingRating}>
                    <Text style={styles.trendingStars}>⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.trendingReviews}>(124)</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Walmart+ Banner */}
        <TouchableOpacity style={styles.walmartPlusBanner}>
          <View style={styles.walmartPlusContent}>
            <View style={styles.walmartPlusIcon}>
              <Zap size={24} color="#ffc220" />
            </View>
            <View style={styles.walmartPlusText}>
              <Text style={styles.walmartPlusTitle}>Try Walmart+ free for 30 days</Text>
              <Text style={styles.walmartPlusSubtitle}>Free delivery, member prices & more</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#64748b',
  },
  searchMic: {
    padding: 4,
  },
  searchMicText: {
    fontSize: 16,
  },
  aiSuggestionBanner: {
    margin: 16,
    backgroundColor: '#0071ce',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  aiSuggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIconContainer: {
    backgroundColor: 'rgba(255, 194, 32, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  aiSuggestionText: {
    flex: 1,
  },
  aiSuggestionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  aiSuggestionSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    lineHeight: 20,
  },
  aiArrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  aiArrowText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center',
  },
  featuredSection: {
    paddingLeft: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#0071ce',
    fontWeight: '600',
  },
  featuredScroll: {
    paddingLeft: 0,
  },
  featuredItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 140,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ffc220',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#0071ce',
    fontWeight: '600',
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 48) / 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
  },
  trendingSection: {
    paddingLeft: 16,
    paddingBottom: 24,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  trendingContent: {
    padding: 12,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 4,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingStars: {
    fontSize: 12,
    marginRight: 4,
  },
  trendingReviews: {
    fontSize: 12,
    color: '#64748b',
  },
  walmartPlusBanner: {
    margin: 16,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
  },
  walmartPlusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walmartPlusIcon: {
    backgroundColor: 'rgba(255, 194, 32, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  walmartPlusText: {
    flex: 1,
  },
  walmartPlusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  walmartPlusSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
});