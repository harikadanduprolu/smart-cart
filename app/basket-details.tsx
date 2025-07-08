import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard as Edit, ShoppingCart, Share2, Plus, Minus, X, Bot, Sparkles, Mic, Search, Check, Trash2, Heart } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const mockBasketDetails = {
  id: 1,
  name: 'Cake Basket',
  category: 'Baking',
  icon: '🎂',
  itemCount: 12,
  lastUsed: '1 week ago',
  totalPrice: 45.67,
  aiEnabled: true,
  items: [
    { 
      id: 1, 
      name: 'All-Purpose Flour, 5 lbs', 
      price: 2.98, 
      quantity: 1, 
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: false,
      category: 'Baking'
    },
    { 
      id: 2, 
      name: 'Sugar, Granulated, 4 lbs', 
      price: 3.48, 
      quantity: 1, 
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: true,
      category: 'Baking'
    },
    { 
      id: 3, 
      name: 'Eggs, Large, 18 count', 
      price: 2.88, 
      quantity: 2, 
      image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: false,
      category: 'Dairy'
    },
    { 
      id: 4, 
      name: 'Butter, Unsalted, 1 lb', 
      price: 4.98, 
      quantity: 1, 
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: false,
      category: 'Dairy'
    },
    { 
      id: 5, 
      name: 'Vanilla Extract, 2 oz', 
      price: 3.98, 
      quantity: 1, 
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: true,
      category: 'Baking'
    },
    { 
      id: 6, 
      name: 'Baking Powder, 10 oz', 
      price: 1.98, 
      quantity: 1, 
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: false,
      category: 'Baking'
    }
  ]
};

const aiSuggestions = [
  { 
    id: 7, 
    name: 'Baking Soda, 1 lb', 
    price: 0.98, 
    reason: 'You usually add baking soda with baking powder',
    confidence: 95
  },
  { 
    id: 8, 
    name: 'Milk, Whole, 1 Gallon', 
    price: 3.68, 
    reason: 'Perfect for cake recipes',
    confidence: 88
  },
  { 
    id: 9, 
    name: 'Cocoa Powder, 8 oz', 
    price: 2.48, 
    reason: 'Great for chocolate cakes',
    confidence: 75
  }
];

export default function BasketDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [basketItems, setBasketItems] = useState(mockBasketDetails.items);
  const [basketName, setBasketName] = useState(mockBasketDetails.name);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setBasketItems(basketItems.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0));
  };

  const toggleCartStatus = (itemId: number) => {
    setBasketItems(basketItems.map(item =>
      item.id === itemId ? { ...item, inCart: !item.inCart } : item
    ));
  };

  const removeItem = (itemId: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your basket?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setBasketItems(basketItems.filter(item => item.id !== itemId))
        }
      ]
    );
  };

  const addSuggestedItem = (item: any) => {
    const newItem = {
      ...item,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      inCart: false,
      category: 'Baking'
    };
    setBasketItems([...basketItems, newItem]);
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedTotal = () => {
    return basketItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addAllToCart = () => {
    setBasketItems(basketItems.map(item => ({ ...item, inCart: true })));
    Alert.alert('Success', 'All items added to cart!');
  };

  const addSelectedToCart = () => {
    setBasketItems(basketItems.map(item => 
      selectedItems.includes(item.id) ? { ...item, inCart: true } : item
    ));
    setSelectedItems([]);
    Alert.alert('Success', `${selectedItems.length} items added to cart!`);
  };

  const shareBasket = async () => {
    try {
      await Share.share({
        message: `Check out my "${basketName}" basket on Walmart! It has ${basketItems.length} items for $${getTotalPrice().toFixed(2)}.`,
        title: 'Share Smart Basket',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
    setShowShareModal(false);
  };

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(basketItems.map(item => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {isEditing ? (
            <TextInput
              style={styles.headerTitleInput}
              value={basketName}
              onChangeText={setBasketName}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <View style={styles.headerTitleRow}>
                <Text style={styles.basketIcon}>{mockBasketDetails.icon}</Text>
                <Text style={styles.headerTitle}>{basketName}</Text>
                <Edit size={16} color="#6b7280" />
              </View>
            </TouchableOpacity>
          )}
          <Text style={styles.headerSubtitle}>{mockBasketDetails.category}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowShareModal(true)}>
          <Share2 size={24} color="#0071ce" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Add new items to basket..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {mockBasketDetails.aiEnabled && (
            <TouchableOpacity 
              style={styles.aiSearchButton}
              onPress={() => setShowAIModal(true)}
            >
              <Bot size={20} color="#0071ce" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Basket Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{basketItems.length}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${getTotalPrice().toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{basketItems.filter(item => item.inCart).length}</Text>
            <Text style={styles.statLabel}>In Cart</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{mockBasketDetails.lastUsed}</Text>
            <Text style={styles.statLabel}>Last Used</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={addAllToCart}>
            <ShoppingCart size={20} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Add All to Cart</Text>
          </TouchableOpacity>
          
          {selectedItems.length > 0 && (
            <TouchableOpacity style={styles.selectedButton} onPress={addSelectedToCart}>
              <Check size={20} color="#ffffff" />
              <Text style={styles.selectedButtonText}>
                Add Selected ({selectedItems.length}) - ${getSelectedTotal().toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Selection Controls */}
        {basketItems.length > 0 && (
          <View style={styles.selectionControls}>
            <TouchableOpacity onPress={selectAll} style={styles.selectionButton}>
              <Text style={styles.selectionButtonText}>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deselectAll} style={styles.selectionButton}>
              <Text style={styles.selectionButtonText}>Deselect All</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Items List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items in Basket</Text>
          {basketItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <TouchableOpacity 
                style={styles.itemCheckbox}
                onPress={() => toggleItemSelection(item.id)}
              >
                {selectedItems.includes(item.id) && (
                  <Check size={16} color="#0071ce" />
                )}
              </TouchableOpacity>
              
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)} each</Text>
                <Text style={styles.itemTotal}>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.itemControls}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} color="#0071ce" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} color="#0071ce" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={[styles.cartToggle, item.inCart && styles.cartToggleActive]}
                    onPress={() => toggleCartStatus(item.id)}
                  >
                    <ShoppingCart size={16} color={item.inCart ? "#ffffff" : "#0071ce"} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* AI Suggestions */}
        {mockBasketDetails.aiEnabled && (
          <View style={styles.suggestionsSection}>
            <View style={styles.suggestionHeader}>
              <Sparkles size={20} color="#ffc220" />
              <Text style={styles.sectionTitle}>🤖 Smart Suggestions</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Based on your basket and shopping history</Text>
            
            {aiSuggestions.map((item) => (
              <View key={item.id} style={styles.suggestionCard}>
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionName}>{item.name}</Text>
                  <Text style={styles.suggestionPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.suggestionReason}>{item.reason}</Text>
                  <View style={styles.confidenceBadge}>
                    <Text style={styles.confidenceText}>{item.confidence}% match</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.addSuggestionButton}
                  onPress={() => addSuggestedItem(item)}
                >
                  <Plus size={20} color="#0071ce" />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.moreAIButton}
              onPress={() => setShowAIModal(true)}
            >
              <Bot size={20} color="#0071ce" />
              <Text style={styles.moreAIButtonText}>Ask AI for More Suggestions</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Share Modal */}
      <Modal visible={showShareModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.shareModalContent}>
            <View style={styles.shareModalHeader}>
              <Text style={styles.shareModalTitle}>Share Smart Basket</Text>
              <TouchableOpacity onPress={() => setShowShareModal(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.shareBasketPreview}>
              <Text style={styles.shareBasketIcon}>{mockBasketDetails.icon}</Text>
              <Text style={styles.shareBasketName}>{basketName}</Text>
              <Text style={styles.shareBasketDetails}>
                {basketItems.length} items • ${getTotalPrice().toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={shareBasket}>
              <Share2 size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>Share via Apps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.copyLinkButton}>
              <Text style={styles.copyLinkButtonText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* AI Assistant Modal */}
      <Modal visible={showAIModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.aiModalContent}>
            <View style={styles.aiModalHeader}>
              <View style={styles.aiModalTitleRow}>
                <Bot size={24} color="#0071ce" />
                <Text style={styles.aiModalTitle}>Basket AI Assistant</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAIModal(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.aiChatArea}>
              <View style={styles.aiMessage}>
                <Bot size={16} color="#0071ce" />
                <Text style={styles.aiMessageText}>
                  Hi! I can help you complete your {basketName}. Here's what I can do:
                  {'\n'}• Suggest missing ingredients
                  {'\n'}• Find better deals
                  {'\n'}• Convert to gluten-free alternatives
                  {'\n'}• Estimate quantities for different serving sizes
                </Text>
              </View>
              
              {aiMessage && (
                <View style={styles.userMessage}>
                  <Text style={styles.userMessageText}>{aiMessage}</Text>
                </View>
              )}
              
              <View style={styles.aiMessage}>
                <Bot size={16} color="#0071ce" />
                <Text style={styles.aiMessageText}>
                  I notice you're missing some common baking essentials. Would you like me to:
                  {'\n'}1. Add baking soda (goes well with baking powder)
                  {'\n'}2. Suggest milk for your cake recipe
                  {'\n'}3. Find organic alternatives
                  {'\n'}4. Calculate ingredients for different cake sizes
                </Text>
              </View>
            </ScrollView>
            
            <View style={styles.aiInputArea}>
              <View style={styles.aiInputContainer}>
                <TextInput
                  style={styles.aiInput}
                  placeholder="Ask me to suggest items or complete your basket..."
                  value={aiMessage}
                  onChangeText={setAiMessage}
                  multiline
                />
                <TouchableOpacity style={styles.voiceButton}>
                  <Mic size={20} color="#0071ce" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.aiActionButtons}>
                <TouchableOpacity style={styles.aiActionButton}>
                  <Text style={styles.aiActionButtonText}>Apply Suggestions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.aiActionButton, styles.customizeButton]}>
                  <Text style={[styles.aiActionButtonText, styles.customizeButtonText]}>Customize</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  basketIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  headerTitleInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#0071ce',
    paddingVertical: 4,
    minWidth: 150,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  searchSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  aiSearchButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0071ce',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  selectedButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  selectionControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0071ce',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectionButtonText: {
    color: '#0071ce',
    fontSize: 14,
    fontWeight: '500',
  },
  itemsSection: {
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
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    width: 60,
    height: 60,
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
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
  },
  itemControls: {
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginHorizontal: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cartToggle: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0071ce',
    borderRadius: 20,
    padding: 8,
  },
  cartToggleActive: {
    backgroundColor: '#0071ce',
  },
  removeButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 20,
    padding: 8,
  },
  suggestionsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  suggestionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
    marginBottom: 2,
  },
  suggestionReason: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  confidenceBadge: {
    backgroundColor: '#ffc220',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000000',
  },
  addSuggestionButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 8,
  },
  moreAIButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#0071ce',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  moreAIButtonText: {
    color: '#0071ce',
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  shareModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  shareModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  shareModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  shareBasketPreview: {
    padding: 20,
    alignItems: 'center',
  },
  shareBasketIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  shareBasketName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  shareBasketDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  shareButton: {
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  copyLinkButton: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
  },
  copyLinkButtonText: {
    color: '#0071ce',
    fontWeight: '600',
  },
  aiModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    paddingTop: 20,
  },
  aiModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  aiModalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  aiChatArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  aiMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
  },
  aiMessageText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0071ce',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 14,
    color: '#ffffff',
  },
  aiInputArea: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  aiInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  aiInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
  },
  voiceButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  aiActionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  aiActionButton: {
    flex: 1,
    backgroundColor: '#0071ce',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  aiActionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  customizeButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0071ce',
  },
  customizeButtonText: {
    color: '#0071ce',
  },
});