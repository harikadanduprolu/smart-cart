import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, ScanLine, Camera, Mic, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const recentSearches = [
  'iPhone 15',
  'Grocery essentials',
  'Nike shoes',
  'Kitchen appliances',
  'Baby formula'
];

const trendingSearches = [
  'Black Friday deals',
  'Christmas decorations',
  'Winter coats',
  'Gaming headsets',
  'Air fryer recipes'
];

const searchSuggestions = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Electronics', price: '$1,199', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 2, name: 'iPhone 15 Case', category: 'Accessories', price: '$29.99', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 3, name: 'iPhone 15 Screen Protector', category: 'Accessories', price: '$12.99', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
];

const categories = [
  { name: 'Electronics', icon: '📱', color: '#3b82f6' },
  { name: 'Grocery', icon: '🛒', color: '#10b981' },
  { name: 'Fashion', icon: '👕', color: '#f59e0b' },
  { name: 'Home', icon: '🏠', color: '#8b5cf6' },
  { name: 'Beauty', icon: '💄', color: '#ec4899' },
  { name: 'Sports', icon: '⚽', color: '#ef4444' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search everything at Walmart"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <ScanLine size={20} color="#0071ce" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Camera size={20} color="#0071ce" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Mic size={20} color="#0071ce" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {!isSearching ? (
          <>
            {/* Search Options */}
            <View style={styles.searchOptions}>
              <TouchableOpacity style={styles.searchOption}>
                <ScanLine size={24} color="#0071ce" />
                <Text style={styles.searchOptionText}>Scan barcode</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchOption}>
                <Camera size={24} color="#0071ce" />
                <Text style={styles.searchOptionText}>Search with camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchOption}>
                <Mic size={24} color="#0071ce" />
                <Text style={styles.searchOptionText}>Voice search</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shop by Category</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category, index) => (
                  <TouchableOpacity key={index} style={styles.categoryCard}>
                    <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                      <Text style={styles.categoryEmoji}>{category.icon}</Text>
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.searchItem}
                  onPress={() => handleSearch(search)}
                >
                  <Search size={16} color="#6b7280" />
                  <Text style={styles.searchItemText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Searches</Text>
              {trendingSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.searchItem}
                  onPress={() => handleSearch(search)}
                >
                  <Text style={styles.trendingIcon}>🔥</Text>
                  <Text style={styles.searchItemText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Search Results */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {searchSuggestions.length} results for "{searchQuery}"
              </Text>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={16} color="#0071ce" />
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>
            </View>

            {/* Search Suggestions */}
            <View style={styles.suggestions}>
              {searchSuggestions.map((item) => (
                <TouchableOpacity key={item.id} style={styles.suggestionItem}>
                  <Image source={{ uri: item.image }} style={styles.suggestionImage} />
                  <View style={styles.suggestionInfo}>
                    <Text style={styles.suggestionName}>{item.name}</Text>
                    <Text style={styles.suggestionCategory}>{item.category}</Text>
                    <Text style={styles.suggestionPrice}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Product Results */}
            <View style={styles.productResults}>
              <Text style={styles.sectionTitle}>Products</Text>
              <View style={styles.productsGrid}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <TouchableOpacity key={item} style={styles.productCard}>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>Product {item}</Text>
                      <Text style={styles.productPrice}>$99.99</Text>
                      <View style={styles.productRating}>
                        <Text style={styles.productStars}>⭐⭐⭐⭐⭐</Text>
                        <Text style={styles.productReviews}>(45)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
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
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  searchOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  searchOption: {
    alignItems: 'center',
  },
  searchOptionText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  searchItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  trendingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultsCount: {
    fontSize: 14,
    color: '#64748b',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#0071ce',
    borderRadius: 20,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#0071ce',
    fontWeight: '500',
  },
  suggestions: {
    padding: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  suggestionImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  suggestionCategory: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  suggestionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
  },
  productResults: {
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
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
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productStars: {
    fontSize: 12,
    marginRight: 4,
  },
  productReviews: {
    fontSize: 12,
    color: '#64748b',
  },
});