import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Plus, X, Tag, Bot, Sparkles, Mic } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockProducts = [
  { id: 1, name: 'Bananas, 3 lbs', price: 1.98, category: 'Fresh Produce', image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 2, name: 'Milk, Whole, 1 Gallon', price: 3.68, category: 'Dairy', image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 3, name: 'Bread, White, 20oz', price: 1.00, category: 'Bakery', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 4, name: 'Eggs, Large, 18 count', price: 2.88, category: 'Dairy', image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 5, name: 'Chicken Breast, 2.5 lbs', price: 7.96, category: 'Meat', image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 6, name: 'Rice, Jasmine, 5 lbs', price: 4.98, category: 'Pantry', image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 7, name: 'All-Purpose Flour, 5 lbs', price: 2.98, category: 'Baking', image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
  { id: 8, name: 'Sugar, Granulated, 4 lbs', price: 3.48, category: 'Baking', image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' },
];

const categories = [
  'Weekly Essentials',
  'Baking',
  'Party',
  'Health',
  'Baby',
  'Pet',
  'Cleaning',
  'Personal Care'
];

const basketIcons = ['🛒', '🎂', '🎉', '💊', '👶', '🐕', '🧽', '🧴', '🍎', '🥖', '🥛', '🍖'];

const aiSuggestions = [
  "Create a birthday party basket with cake mix, candles, and decorations",
  "Build a healthy breakfast basket with oats, fruits, and yogurt",
  "Make a baking essentials basket with flour, sugar, and vanilla",
  "Set up a weekly grocery basket based on your purchase history"
];

export default function CreateBasketScreen() {
  const router = useRouter();
  const [basketName, setBasketName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🛒');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [step, setStep] = useState(1);
  const [aiMessage, setAiMessage] = useState('');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToBasket = (product: any) => {
    const existingItem = selectedItems.find(item => item.id === product.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromBasket = (productId: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromBasket(productId);
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const saveBasket = () => {
    if (!basketName.trim()) {
      Alert.alert('Error', 'Please enter a basket name');
      return;
    }
    if (selectedItems.length === 0) {
      Alert.alert('Error', 'Please add at least one item to your basket');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    Alert.alert(
      'Success!', 
      `Your "${basketName}" basket has been created with ${selectedItems.length} items!`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleAISuggestion = (suggestion: string) => {
    setAiMessage(suggestion);
    setShowAIModal(true);
  };

  const applyAISuggestion = () => {
    // Simulate AI adding suggested items
    const suggestedItems = [
      { id: 101, name: 'Birthday Candles', price: 2.99, category: 'Party', quantity: 1 },
      { id: 102, name: 'Cake Mix, Vanilla', price: 1.49, category: 'Baking', quantity: 1 },
      { id: 103, name: 'Frosting, Chocolate', price: 2.79, category: 'Baking', quantity: 1 }
    ];
    
    setSelectedItems([...selectedItems, ...suggestedItems]);
    setBasketName('Birthday Party Basket');
    setSelectedCategory('Party');
    setSelectedIcon('🎉');
    setShowAIModal(false);
    setStep(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Smart Basket</Text>
        <TouchableOpacity onPress={() => setShowAIModal(true)}>
          <Bot size={24} color="#0071ce" />
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, step >= 1 && styles.progressStepActive]} />
          <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]} />
          <View style={[styles.progressStep, step >= 3 && styles.progressStepActive]} />
        </View>
        <Text style={styles.progressText}>Step {step} of 3</Text>
      </View>

      {step === 1 && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.stepTitle}>Name Your Smart Basket</Text>
            <Text style={styles.stepSubtitle}>Give your basket a memorable name</Text>
            
            <TextInput
              style={styles.nameInput}
              placeholder="Enter basket name (e.g., Weekly Groceries, Cake Basket)"
              value={basketName}
              onChangeText={setBasketName}
              autoFocus
            />

            {/* Icon Selection */}
            <Text style={styles.sectionLabel}>Choose an Icon</Text>
            <TouchableOpacity
              style={styles.iconSelector}
              onPress={() => setShowIconModal(true)}
            >
              <Text style={styles.selectedIcon}>{selectedIcon}</Text>
              <Text style={styles.iconSelectorText}>Tap to change icon</Text>
            </TouchableOpacity>

            {/* AI Suggestions */}
            <View style={styles.aiSuggestionsContainer}>
              <View style={styles.aiSuggestionsHeader}>
                <Sparkles size={20} color="#ffc220" />
                <Text style={styles.sectionLabel}>🤖 AI Quick Start</Text>
              </View>
              <Text style={styles.aiSuggestionsSubtitle}>Let AI help you get started</Text>
              
              {aiSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.aiSuggestionCard}
                  onPress={() => handleAISuggestion(suggestion)}
                >
                  <Bot size={16} color="#0071ce" />
                  <Text style={styles.aiSuggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !basketName && styles.nextButtonDisabled]}
              onPress={() => setStep(2)}
              disabled={!basketName}
            >
              <Text style={[styles.nextButtonText, !basketName && styles.nextButtonTextDisabled]}>
                Next: Add Items
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {step === 2 && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.stepTitle}>Add Items to Your Basket</Text>
            <Text style={styles.stepSubtitle}>Search and add products to "{basketName}"</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Search size={20} color="#6b7280" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity 
                style={styles.voiceSearchButton}
                onPress={() => setShowAIModal(true)}
              >
                <Mic size={20} color="#0071ce" />
              </TouchableOpacity>
            </View>

            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <View style={styles.selectedSummary}>
                <View style={styles.summaryHeader}>
                  <Text style={styles.selectedIcon}>{selectedIcon}</Text>
                  <View style={styles.summaryText}>
                    <Text style={styles.summaryTitle}>{basketName}</Text>
                    <Text style={styles.summaryDetails}>
                      {selectedItems.length} items • ${getTotalPrice().toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Product List */}
            <View style={styles.productList}>
              {filteredProducts.map((product) => {
                const selectedItem = selectedItems.find(item => item.id === product.id);
                return (
                  <View key={product.id} style={styles.productItem}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productCategory}>{product.category}</Text>
                      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    </View>
                    {selectedItem ? (
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(product.id, selectedItem.quantity - 1)}
                        >
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{selectedItem.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(product.id, selectedItem.quantity + 1)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToBasket(product)}
                      >
                        <Plus size={20} color="#0071ce" />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextStepButton, selectedItems.length === 0 && styles.nextButtonDisabled]}
              onPress={() => setStep(3)}
              disabled={selectedItems.length === 0}
            >
              <Text style={[styles.nextStepButtonText, selectedItems.length === 0 && styles.nextButtonTextDisabled]}>
                Next: Finalize Basket
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {step === 3 && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.stepTitle}>Finalize Your Smart Basket</Text>
            <Text style={styles.stepSubtitle}>Choose category and AI settings</Text>
            
            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setShowCategoryModal(true)}
            >
              <Tag size={20} color="#6b7280" />
              <Text style={styles.categorySelectorText}>
                {selectedCategory || 'Select category...'}
              </Text>
            </TouchableOpacity>

            {/* AI Settings */}
            <View style={styles.aiSettingsContainer}>
              <View style={styles.aiSettingsHeader}>
                <Bot size={20} color="#0071ce" />
                <Text style={styles.sectionLabel}>AI Assistant Settings</Text>
              </View>
              <View style={styles.aiSettingItem}>
                <View style={styles.aiSettingInfo}>
                  <Text style={styles.aiSettingTitle}>Enable AI Suggestions</Text>
                  <Text style={styles.aiSettingDescription}>
                    Get smart recommendations and auto-complete suggestions
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.aiToggle, aiEnabled && styles.aiToggleActive]}
                  onPress={() => setAiEnabled(!aiEnabled)}
                >
                  <View style={[styles.aiToggleThumb, aiEnabled && styles.aiToggleThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.basketSummary}>
              <Text style={styles.basketSummaryTitle}>Basket Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>{basketName}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Icon:</Text>
                <Text style={styles.summaryValue}>{selectedIcon}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Category:</Text>
                <Text style={styles.summaryValue}>{selectedCategory || 'Not selected'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items:</Text>
                <Text style={styles.summaryValue}>{selectedItems.length}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total:</Text>
                <Text style={[styles.summaryValue, styles.summaryTotal]}>${getTotalPrice().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>AI Enabled:</Text>
                <Text style={styles.summaryValue}>{aiEnabled ? 'Yes' : 'No'}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.saveButton, !selectedCategory && styles.saveButtonDisabled]}
              onPress={saveBasket}
              disabled={!selectedCategory}
            >
              <Text style={[styles.saveButtonText, !selectedCategory && styles.saveButtonTextDisabled]}>
                Create Smart Basket
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Icon Selection Modal */}
      <Modal visible={showIconModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Basket Icon</Text>
              <TouchableOpacity onPress={() => setShowIconModal(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconGrid}>
              {basketIcons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[styles.iconOption, selectedIcon === icon && styles.iconOptionSelected]}
                  onPress={() => {
                    setSelectedIcon(icon);
                    setShowIconModal(false);
                  }}
                >
                  <Text style={styles.iconOptionText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Selection Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryOption}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={styles.categoryOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
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
                <Text style={styles.aiModalTitle}>AI Basket Creator</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAIModal(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.aiChatArea}>
              <View style={styles.aiMessage}>
                <Bot size={16} color="#0071ce" />
                <Text style={styles.aiMessageText}>
                  Hi! I can help you create the perfect basket. I can:
                  {'\n'}• Suggest items based on your request
                  {'\n'}• Create themed baskets (birthday, weekly groceries, etc.)
                  {'\n'}• Find the best deals
                  {'\n'}• Estimate quantities for different needs
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
                  Great idea! I'll help you create that basket. Let me suggest some items and set everything up for you.
                </Text>
              </View>
            </ScrollView>
            
            <View style={styles.aiInputArea}>
              <View style={styles.aiInputContainer}>
                <TextInput
                  style={styles.aiInput}
                  placeholder="Tell me what kind of basket you want to create..."
                  value={aiMessage}
                  onChangeText={setAiMessage}
                  multiline
                />
                <TouchableOpacity style={styles.voiceButton}>
                  <Mic size={20} color="#0071ce" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.aiActionButtons}>
                <TouchableOpacity style={styles.aiActionButton} onPress={applyAISuggestion}>
                  <Text style={styles.aiActionButtonText}>Apply Suggestion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.aiActionButton, styles.customizeButton]}>
                  <Text style={[styles.aiActionButtonText, styles.customizeButtonText]}>Let Me Choose</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  progressContainer: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  progressStep: {
    width: 60,
    height: 4,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#0071ce',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  iconSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  selectedIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  iconSelectorText: {
    fontSize: 16,
    color: '#6b7280',
  },
  aiSuggestionsContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  aiSuggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiSuggestionsSubtitle: {
    fontSize: 14,
    color: '#0369a1',
    marginBottom: 16,
  },
  aiSuggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  aiSuggestionText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#0071ce',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#9ca3af',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  voiceSearchButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  selectedSummary: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 2,
  },
  summaryDetails: {
    fontSize: 14,
    color: '#0369a1',
  },
  productList: {
    marginBottom: 24,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
  },
  addButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 8,
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
  nextStepButton: {
    backgroundColor: '#0071ce',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextStepButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  categorySelectorText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  aiSettingsContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  aiSettingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiSettingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiSettingInfo: {
    flex: 1,
    marginRight: 16,
  },
  aiSettingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  aiSettingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  aiToggle: {
    width: 50,
    height: 30,
    backgroundColor: '#d1d5db',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  aiToggleActive: {
    backgroundColor: '#0071ce',
  },
  aiToggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: '#ffffff',
    borderRadius: 13,
    alignSelf: 'flex-start',
  },
  aiToggleThumbActive: {
    alignSelf: 'flex-end',
  },
  basketSummary: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  basketSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0071ce',
  },
  saveButton: {
    backgroundColor: '#0071ce',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconOption: {
    width: '16.66%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },
  iconOptionSelected: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#0071ce',
  },
  iconOptionText: {
    fontSize: 24,
  },
  categoryOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#111827',
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