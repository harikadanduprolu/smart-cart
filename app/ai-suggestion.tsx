import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Sparkles, ShoppingCart, Bookmark, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const aiSuggestedBasket = {
  name: 'Your Weekly Essentials',
  confidence: 92,
  reason: 'Based on your last 4 orders and seasonal trends',
  totalPrice: 89.47,
  items: [
    { 
      id: 1, 
      name: 'Bananas, 3 lbs', 
      price: 1.98, 
      quantity: 2, 
      category: 'Fresh Produce',
      confidence: 95,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    { 
      id: 2, 
      name: 'Milk, Whole, 1 Gallon', 
      price: 3.68, 
      quantity: 1, 
      category: 'Dairy',
      confidence: 88,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    { 
      id: 3, 
      name: 'Bread, Whole Wheat, 20oz', 
      price: 1.50, 
      quantity: 2, 
      category: 'Bakery',
      confidence: 82,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    { 
      id: 4, 
      name: 'Ground Turkey, 1 lb', 
      price: 4.98, 
      quantity: 1, 
      category: 'Meat',
      confidence: 75,
      image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    { 
      id: 5, 
      name: 'Spinach, Fresh, 5oz', 
      price: 2.48, 
      quantity: 2, 
      category: 'Fresh Produce',
      confidence: 78,
      image: 'https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    { 
      id: 6, 
      name: 'Greek Yogurt, Plain, 32oz', 
      price: 5.48, 
      quantity: 1, 
      category: 'Dairy',
      confidence: 85,
      image: 'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    }
  ]
};

export default function AISuggestionScreen() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState(aiSuggestedBasket.items.map(item => item.id));

  const toggleItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getSelectedTotal = () => {
    return aiSuggestedBasket.items
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addToCart = () => {
    // Add selected items to cart
    router.back();
  };

  const saveAsBasket = () => {
    // Save as new basket
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Suggestion</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* AI Banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconContainer}>
              <Sparkles size={24} color="#ffc220" />
            </View>
            <View style={styles.aiHeaderText}>
              <Text style={styles.aiTitle}>Need a hand?</Text>
              <Text style={styles.aiSubtitle}>We've generated a basket based on your past orders</Text>
            </View>
          </View>
          
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>{aiSuggestedBasket.confidence}% match</Text>
            <Text style={styles.reasonText}>{aiSuggestedBasket.reason}</Text>
          </View>
        </View>

        {/* Suggested Basket */}
        <View style={styles.basketSection}>
          <View style={styles.basketHeader}>
            <Text style={styles.basketName}>{aiSuggestedBasket.name}</Text>
            <Text style={styles.basketSubtext}>
              {selectedItems.length} of {aiSuggestedBasket.items.length} items selected
            </Text>
          </View>

          {/* Items List */}
          {aiSuggestedBasket.items.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                onPress={() => toggleItem(item.id)}
              >
                <View style={styles.itemCheckbox}>
                  {isSelected && <Check size={16} color="#0071ce" />}
                </View>
                
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <View style={styles.itemPricing}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.itemQuantity}>× {item.quantity}</Text>
                  </View>
                </View>
                
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceBadgeText}>{item.confidence}%</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category Breakdown */}
        <View style={styles.categoryBreakdown}>
          <Text style={styles.sectionTitle}>Categories Covered</Text>
          {['Fresh Produce', 'Dairy', 'Bakery', 'Meat'].map((category) => {
            const categoryItems = aiSuggestedBasket.items.filter(item => 
              item.category === category && selectedItems.includes(item.id)
            );
            const categoryTotal = categoryItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return (
              <View key={category} style={styles.categoryItem}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryDetails}>
                  {categoryItems.length} items • ${categoryTotal.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Why These Items */}
        <View style={styles.whySection}>
          <Text style={styles.sectionTitle}>Why These Items?</Text>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>🔄</Text>
            <Text style={styles.reasonText}>You order these items every 7-10 days</Text>
          </View>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>📈</Text>
            <Text style={styles.reasonText}>Popular items this season</Text>
          </View>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>💡</Text>
            <Text style={styles.reasonText}>Matches your dietary preferences</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Selected Total</Text>
          <Text style={styles.totalPrice}>${getSelectedTotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={saveAsBasket}>
            <Bookmark size={20} color="#0071ce" />
            <Text style={styles.saveButtonText}>Save as Basket</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <ShoppingCart size={20} color="#ffffff" />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiIconContainer: {
    backgroundColor: 'rgba(255, 194, 32, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  aiHeaderText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#e0f2fe',
  },
  confidenceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffc220',
    marginBottom: 2,
  },
  reasonText: {
    fontSize: 12,
    color: '#e0f2fe',
  },
  basketSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  basketHeader: {
    marginBottom: 16,
  },
  basketName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  basketSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    opacity: 0.6,
  },
  itemCardSelected: {
    opacity: 1,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  itemCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  itemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
    marginRight: 8,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6b7280',
  },
  confidenceBadge: {
    backgroundColor: '#ffc220',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  confidenceBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000000',
  },
  categoryBreakdown: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#111827',
  },
  categoryDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  whySection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reasonIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  bottomActions: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0071ce',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#0071ce',
    fontWeight: '600',
    marginLeft: 8,
  },
  addToCartButton: {
    flex: 2,
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
});