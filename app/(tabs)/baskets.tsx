import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Edit, RotateCcw, Clock, ShoppingCart, Sparkles, Mic, Search, X, MessageCircle, Bot } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const mockBaskets = [
  {
    id: 1,
    name: 'Weekly Groceries',
    itemCount: 24,
    lastUsed: '3 days ago',
    totalPrice: 127.89,
    thumbnail: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    category: 'Weekly Essentials',
    icon: '🛒',
    aiEnabled: true
  },
  {
    id: 2,
    name: 'Cake Basket',
    itemCount: 12,
    lastUsed: '1 week ago',
    totalPrice: 45.67,
    thumbnail: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    category: 'Baking',
    icon: '🎂',
    aiEnabled: true
  },
  {
    id: 3,
    name: 'Party Essentials',
    itemCount: 18,
    lastUsed: '2 weeks ago',
    totalPrice: 89.34,
    thumbnail: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    category: 'Party',
    icon: '🎉',
    aiEnabled: false
  },
  {
    id: 4,
    name: 'Daily Essentials',
    itemCount: 8,
    lastUsed: '4 days ago',
    totalPrice: 32.56,
    thumbnail: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    category: 'Health',
    icon: '💊',
    aiEnabled: true
  }
];

const cartItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1199.00,
    quantity: 1,
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    addedFrom: 'Direct Search'
  },
  {
    id: 2,
    name: 'Bananas, 3 lbs',
    price: 1.98,
    quantity: 2,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    addedFrom: 'Weekly Groceries Basket'
  }
];

export default function SmartBasketsScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'baskets' | 'cart'>('baskets');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const aiSuggestions = [
    "It's Diwali next week — want to prep a Festive Basket?",
    "You usually buy milk every 10 days — time to reorder?",
    "Want to convert your Cake Basket to gluten-free options?",
    "Based on your history, you might need eggs for baking"
  ];

  const handleAIInteraction = (message: string) => {
    setAiMessage(message);
    setShowAIModal(true);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Toggle */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Smart Baskets</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'cart' && styles.activeToggle]}
            onPress={() => setViewMode('cart')}
          >
            <ShoppingCart size={16} color={viewMode === 'cart' ? '#ffffff' : '#0071ce'} />
            <Text style={[styles.toggleText, viewMode === 'cart' && styles.activeToggleText]}>
              Cart ({cartItems.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'baskets' && styles.activeToggle]}
            onPress={() => setViewMode('baskets')}
          >
            <Text style={styles.basketEmoji}>🧺</Text>
            <Text style={[styles.toggleText, viewMode === 'baskets' && styles.activeToggleText]}>
              Baskets ({mockBaskets.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Assistant Floating Button */}
      <TouchableOpacity 
        style={styles.aiFloatingButton}
        onPress={() => setShowAIModal(true)}
      >
        <Bot size={24} color="#ffffff" />
        <View style={styles.aiPulse} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {viewMode === 'baskets' ? (
          <>
            {/* Create New Basket Button */}
            <View style={styles.createSection}>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => router.push('/create-basket')}
              >
                <Plus size={20} color="#ffffff" />
                <Text style={styles.createButtonText}>Create New Smart Basket</Text>
              </TouchableOpacity>
            </View>

            {/* AI Suggestions Banner */}
            <View style={styles.aiSuggestionsSection}>
              <Text style={styles.sectionTitle}>🤖 AI Suggestions</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {aiSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionCard}
                    onPress={() => handleAIInteraction(suggestion)}
                  >
                    <Sparkles size={16} color="#ffc220" />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Baskets List */}
            <View style={styles.basketsList}>
              <Text style={styles.sectionTitle}>Your Smart Baskets</Text>
              {mockBaskets.map((basket) => (
                <TouchableOpacity
                  key={basket.id}
                  style={styles.basketCard}
                  onPress={() => router.push(`/basket-details?id=${basket.id}`)}
                >
                  <Image source={{ uri: basket.thumbnail }} style={styles.basketImage} />
                  
                  <View style={styles.basketInfo}>
                    <View style={styles.basketHeader}>
                      <View style={styles.basketTitleRow}>
                        <Text style={styles.basketIcon}>{basket.icon}</Text>
                        <Text style={styles.basketName}>{basket.name}</Text>
                        {basket.aiEnabled && (
                          <View style={styles.aiEnabledBadge}>
                            <Sparkles size={12} color="#ffc220" />
                            <Text style={styles.aiEnabledText}>AI</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.categoryTag}>
                        <Text style={styles.categoryText}>{basket.category}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.basketStats}>
                      <Text style={styles.itemCount}>{basket.itemCount} items</Text>
                      <View style={styles.lastUsedContainer}>
                        <Clock size={12} color="#6b7280" />
                        <Text style={styles.lastUsed}>{basket.lastUsed}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.basketFooter}>
                      <Text style={styles.totalPrice}>${basket.totalPrice.toFixed(2)}</Text>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Edit size={14} color="#0071ce" />
                          <Text style={styles.actionButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <RotateCcw size={14} color="#0071ce" />
                          <Text style={styles.actionButtonText}>Reorder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.addToCartButton]}>
                          <ShoppingCart size={14} color="#ffffff" />
                          <Text style={[styles.actionButtonText, styles.addToCartButtonText]}>Add to Cart</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          /* Cart View */
          <View style={styles.cartSection}>
            <View style={styles.cartHeader}>
              <Text style={styles.sectionTitle}>Shopping Cart</Text>
              <Text style={styles.cartTotal}>${getCartTotal().toFixed(2)}</Text>
            </View>
            
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemSource}>From: {item.addedFrom}</Text>
                  <View style={styles.cartItemFooter}>
                    <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

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
                  Hi! I'm your Smart Basket assistant. I can help you:
                  {'\n'}• Suggest items based on your history
                  {'\n'}• Complete your baskets
                  {'\n'}• Find better deals
                  {'\n'}• Convert recipes to shopping lists
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
                  Great question! I can help you with that. Would you like me to:
                  {'\n'}1. Create a new basket
                  {'\n'}2. Add suggested items
                  {'\n'}3. Find alternatives
                </Text>
              </View>
            </ScrollView>
            
            <View style={styles.aiInputArea}>
              <View style={styles.aiInputContainer}>
                <TextInput
                  style={styles.aiInput}
                  placeholder="Ask me to suggest items or complete your basket..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: '#0071ce',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
    marginLeft: 6,
  },
  activeToggleText: {
    color: '#ffffff',
  },
  basketEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  aiFloatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#0071ce',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  aiPulse: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0071ce',
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  createSection: {
    padding: 16,
  },
  createButton: {
    backgroundColor: '#0071ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  aiSuggestionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 280,
  },
  suggestionText: {
    fontSize: 14,
    color: '#9a3412',
    marginLeft: 8,
    fontWeight: '500',
  },
  basketsList: {
    paddingHorizontal: 16,
  },
  basketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  basketImage: {
    width: '100%',
    height: 120,
  },
  basketInfo: {
    padding: 16,
  },
  basketHeader: {
    marginBottom: 8,
  },
  basketTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  basketIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  basketName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  aiEnabledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#ffc220',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  aiEnabledText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 4,
  },
  categoryTag: {
    backgroundColor: '#ffc220',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  basketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  lastUsedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastUsed: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  basketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0071ce',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0071ce',
    backgroundColor: '#ffffff',
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '500',
    color: '#0071ce',
  },
  addToCartButton: {
    backgroundColor: '#0071ce',
    borderColor: '#0071ce',
  },
  addToCartButtonText: {
    color: '#ffffff',
  },
  cartSection: {
    padding: 16,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0071ce',
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  cartItemSource: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0071ce',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0071ce',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginHorizontal: 12,
  },
  checkoutButton: {
    backgroundColor: '#0071ce',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
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