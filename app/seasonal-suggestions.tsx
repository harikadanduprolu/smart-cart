import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Sparkles, Plus, Clock, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const seasonalSuggestions = [
  {
    id: 1,
    title: 'Diwali Festival Basket',
    subtitle: 'Traditional sweets and decorations',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    daysLeft: 7,
    estimatedPrice: 89.99,
    items: ['Diyas & Candles', 'Rangoli Colors', 'Sweets & Mithai', 'Decorative Lights'],
    popularity: 95,
    category: 'Festival'
  },
  {
    id: 2,
    title: 'Halloween Party Essentials',
    subtitle: 'Spooky decorations and treats',
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    daysLeft: 12,
    estimatedPrice: 67.45,
    items: ['Pumpkins', 'Candy & Treats', 'Decorations', 'Costumes'],
    popularity: 88,
    category: 'Holiday'
  },
  {
    id: 3,
    title: 'Back to School Supplies',
    subtitle: 'Everything for the new semester',
    image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    daysLeft: 3,
    estimatedPrice: 124.50,
    items: ['Notebooks', 'Pens & Pencils', 'Backpack', 'Lunch Supplies'],
    popularity: 92,
    category: 'Education'
  },
  {
    id: 4,
    title: 'Winter Comfort Foods',
    subtitle: 'Warm meals for cold days',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    daysLeft: 21,
    estimatedPrice: 78.30,
    items: ['Soup Ingredients', 'Hot Chocolate', 'Warm Spices', 'Comfort Snacks'],
    popularity: 76,
    category: 'Seasonal'
  }
];

const trendingItems = [
  {
    id: 1,
    name: 'Pumpkin Spice Coffee',
    price: 8.99,
    trend: '+45%',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  },
  {
    id: 2,
    name: 'LED String Lights',
    price: 12.99,
    trend: '+38%',
    image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  },
  {
    id: 3,
    name: 'Scented Candles',
    price: 15.99,
    trend: '+29%',
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  }
];

export default function SeasonalSuggestionsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Festival', 'Holiday', 'Education', 'Seasonal'];

  const filteredSuggestions = selectedCategory === 'All' 
    ? seasonalSuggestions 
    : seasonalSuggestions.filter(item => item.category === selectedCategory);

  const createBasketFromSuggestion = (suggestion: any) => {
    // Navigate to create basket with pre-filled data
    router.push(`/create-basket?template=${suggestion.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seasonal Suggestions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* AI Banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiContent}>
            <Sparkles size={24} color="#ffc220" />
            <View style={styles.aiText}>
              <Text style={styles.aiTitle}>Smart Seasonal Baskets</Text>
              <Text style={styles.aiSubtitle}>
                AI-curated baskets based on upcoming events and seasonal trends
              </Text>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Seasonal Suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          {filteredSuggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={styles.suggestionCard}
              onPress={() => createBasketFromSuggestion(suggestion)}
            >
              <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
              
              <View style={styles.suggestionOverlay}>
                <View style={styles.urgencyBadge}>
                  <Clock size={12} color="#ffffff" />
                  <Text style={styles.urgencyText}>{suggestion.daysLeft} days left</Text>
                </View>
                
                <View style={styles.popularityBadge}>
                  <TrendingUp size={12} color="#ffc220" />
                  <Text style={styles.popularityText}>{suggestion.popularity}% popular</Text>
                </View>
              </View>
              
              <View style={styles.suggestionContent}>
                <View style={styles.suggestionHeader}>
                  <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                  <Text style={styles.suggestionSubtitle}>{suggestion.subtitle}</Text>
                </View>
                
                <View style={styles.suggestionItems}>
                  {suggestion.items.slice(0, 3).map((item, index) => (
                    <View key={index} style={styles.itemTag}>
                      <Text style={styles.itemTagText}>{item}</Text>
                    </View>
                  ))}
                  {suggestion.items.length > 3 && (
                    <View style={styles.itemTag}>
                      <Text style={styles.itemTagText}>+{suggestion.items.length - 3} more</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.suggestionFooter}>
                  <Text style={styles.estimatedPrice}>
                    Est. ${suggestion.estimatedPrice.toFixed(2)}
                  </Text>
                  <TouchableOpacity 
                    style={styles.createButton}
                    onPress={() => createBasketFromSuggestion(suggestion)}
                  >
                    <Plus size={16} color="#ffffff" />
                    <Text style={styles.createButtonText}>Create Basket</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Items */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>🔥 Trending Items This Week</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingItems.map((item) => (
              <View key={item.id} style={styles.trendingItem}>
                <Image source={{ uri: item.image }} style={styles.trendingImage} />
                <View style={styles.trendBadge}>
                  <Text style={styles.trendText}>{item.trend}</Text>
                </View>
                <View style={styles.trendingContent}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingPrice}>${item.price}</Text>
                  <TouchableOpacity style={styles.addTrendingButton}>
                    <Plus size={14} color="#0071ce" />
                    <Text style={styles.addTrendingText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Reminders */}
        <View style={styles.remindersSection}>
          <Text style={styles.sectionTitle}>📅 Upcoming Events</Text>
          <View style={styles.reminderCard}>
            <Calendar size={20} color="#0071ce" />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Thanksgiving Dinner</Text>
              <Text style={styles.reminderDate}>November 23, 2024 • 18 days</Text>
              <Text style={styles.reminderDescription}>
                Start planning your Thanksgiving feast with our curated basket
              </Text>
            </View>
            <TouchableOpacity style={styles.reminderButton}>
              <Text style={styles.reminderButtonText}>Plan Now</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.reminderCard}>
            <Calendar size={20} color="#0071ce" />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Black Friday Shopping</Text>
              <Text style={styles.reminderDate}>November 24, 2024 • 19 days</Text>
              <Text style={styles.reminderDescription}>
                Get ready for the biggest shopping day with our deals basket
              </Text>
            </View>
            <TouchableOpacity style={styles.reminderButton}>
              <Text style={styles.reminderButtonText}>Prepare</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  scrollView: {
    flex: 1,
  },
  aiBanner: {
    backgroundColor: '#0071ce',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiText: {
    flex: 1,
    marginLeft: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    lineHeight: 20,
  },
  categorySection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#0071ce',
    borderColor: '#0071ce',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  suggestionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  suggestionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  suggestionImage: {
    width: '100%',
    height: 160,
  },
  suggestionOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgencyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  popularityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  suggestionContent: {
    padding: 16,
  },
  suggestionHeader: {
    marginBottom: 12,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  suggestionItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  itemTag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  itemTagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  suggestionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0071ce',
  },
  createButton: {
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  trendingSection: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  trendingItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: 100,
  },
  trendBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  trendText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  trendingContent: {
    padding: 12,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 8,
  },
  addTrendingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    paddingVertical: 6,
  },
  addTrendingText: {
    color: '#0071ce',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  remindersSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  reminderCard: {
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
  reminderContent: {
    flex: 1,
    marginLeft: 12,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 12,
    color: '#0071ce',
    fontWeight: '500',
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  reminderButton: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#0071ce',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reminderButtonText: {
    color: '#0071ce',
    fontSize: 12,
    fontWeight: '600',
  },
});