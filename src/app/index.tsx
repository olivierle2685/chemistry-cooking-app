import { useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const skillTreeData = {
  modules: [
    { moduleId: "core_free", name: "Foundational Techniques", isPremium: false }
  ],
  nodes: [
    { id: "tech_julienne", moduleId: "core_free", title: "Knife Skills: Julienne", type: "technique", prerequisites: [] },
    { id: "tech_dice_onion", moduleId: "core_free", title: "Knife Skills: Dicing an Onion", type: "technique", prerequisites: [] },
    { id: "tech_brunoise", moduleId: "core_free", title: "Knife Skills: Brunoise", type: "technique", prerequisites: ["tech_julienne"] },
    { id: "sci_maillard", moduleId: "core_free", title: "Science: The Maillard Reaction", type: "chemistry", prerequisites: ["tech_brunoise", "tech_dice_onion"] }
  ]
};


// 2. The Lesson Database
const lessonDatabase: any = {
  
  "tech_brunoise": {
    title: "The Brunoise & Mirepoix",
    slides: [
      {
        id: "s1",
        type: "theory",
        content: "A Brunoise produces perfect 1/8-inch (3mm) cubes. It is the finest dice in classic French cuisine, used for garnishes and refined sauces."
      },
      {
        id: "s2",
        type: "image",
        url: "https://images.unsplash.com/photo-1615388517618-300e231dc3dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: "s3",
        type: "application",
        content: "To achieve this, you simply cut a perfect Julienne (matchsticks), gather the sticks tightly, and slice horizontally at 1/8-inch intervals. A 'Mirepoix Brunoise' applies this exact cut to onions, carrots, and celery so they cook at the identical speed."
      }
    ],
    quiz: {
      question: "What is the correct physical process for cutting a Brunoise?",
      options: [
        { id: "a", text: "Roughly chop the vegetable until the pieces are very small." },
        { id: "b", text: "First cut a perfect Julienne, then gather them and slice horizontally into 1/8-inch cubes." },
        { id: "c", text: "Use a food processor on the pulse setting." }
      ],
      correctId: "b"
    }
  },
  "tech_julienne": {
    title: "The Classic Julienne",
    slides: [
      {
        id: "s1",
        type: "theory",
        content: "A julienne is a classic French cut resulting in thin 'matchsticks'. The strict professional dimensions are 1/8 inch by 1/8 inch by 2 inches (3mm x 3mm x 5cm)."
      },
      {
        id: "s2",
        type: "application",
        content: "The 'Square Off' Method: First, cut your vegetable to a 2-inch length. Slice off the four rounded sides to create a perfect rectangular block. This prevents the vegetable from rolling on the board."
      },
      {
        id: "s3",
        type: "application",
        content: "The Planks: Slice your squared block into 1/8-inch thick planks. Stack the planks up, and slice down through the stack at 1/8-inch intervals using a smooth forward pushing motion."
      }
    ],
    quiz: {
      question: "Why is it mandatory to 'square off' a round vegetable before starting the julienne?",
      options: [
        { id: "a", text: "To remove the bitter skin of the vegetable." },
        { id: "b", text: "To create a flat, stable base that won't roll, ensuring perfectly even matchsticks." },
        { id: "c", text: "To make the vegetable cook twice as fast in the pan." }
      ],
      correctId: "b"
    }
  },
"tech_dice_onion": {
    title: "Ciseler: Dicing an Onion",
    slides: [
      {
        id: "s1",
        type: "theory",
        content: "Unlike carrots, onions have a natural layered structure. We use the root of the onion to hold all those layers together while we make our cuts."
      },
      {
        id: "s2",
        type: "application",
        content: "Step 1: Halve the onion through the root. Peel it. Place it flat on the board. Make horizontal cuts parallel to the board, stopping just before the root so it stays intact."
      },
      {
        id: "s3",
        type: "application",
        content: "Step 2: Make vertical slices from pole to pole, again leaving the root intact. Finally, cut across the vertical slices to release perfect, uniform squares."
      }
    ],
    quiz: {
      question: "What is the primary function of leaving the root intact when dicing an onion?",
      options: [
        { id: "a", text: "The root contains the most flavor and must be cooked whole." },
        { id: "b", text: "It holds the natural layers together, acting as an anchor while you make your horizontal and vertical cuts." },
        { id: "c", text: "It prevents the onion from releasing the gas that makes you cry." }
      ],
      correctId: "b"
    }
  },
  "sci_maillard": {
    title: "Moisture Control & Browning",
    slides: [
      {
        id: "s1",
        type: "theory",
        content: "The Maillard reaction requires temperatures above 140°C (284°F) to create complex, savory flavor molecules."
      },
      {
        id: "s2",
        type: "application",
        content: "When browning ground beef, crowding the pan traps evaporating water. Water caps the temperature at 100°C (212°F). The meat will boil and turn grey. You must achieve the brown sear FIRST."
      },
      {
        id: "s3",
        type: "theory",
        content: "Thermal Bridging: Pans transfer heat via direct conduction. The meat needs continuous, flush contact with the hot metal to drive high heat into the surface. Moving or flipping the meat too early breaks this bridge, dropping the temperature out of the Maillard zone."
      },
      {
        id: "s4",
        type: "application",
        content: "The Chemical Release: Raw proteins initially bond to the hot metal. As the intense heat denatures the proteins, they form a rigid crust that naturally releases from the pan. Forcing it with a spatula tears the crust."
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "Why must you avoid crowding the pan when cooking ground beef?",
        options: [
          { id: "a", text: "It burns the spices too quickly." },
          { id: "b", text: "It traps moisture, dropping the heat below 140°C and causing steaming." },
          { id: "c", text: "It causes the fat to separate." }
        ],
        correctId: "b"
      },
      {
        id: "q2",
        question: "Why should you avoid constantly stirring or moving the meat before it sears?",
        options: [
          { id: "a", text: "It breaks the thermal bridge with the pan and tears the un-denatured proteins." },
          { id: "b", text: "It causes the meat to cook too fast." },
          { id: "c", text: "It makes the pan too hot." }
        ],
        correctId: "a"
      }
    ]
  }
};

// 3. The Main Application Engine
export default function Index() {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // New upgraded state for multiple questions
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLessonComplete, setIsLessonComplete] = useState<boolean>(false);

  const handleNodePress = (node: any) => {
    const hasPrereqs = node.prerequisites.every((prereq: any) => completedNodes.includes(prereq));
    if (hasPrereqs) {
      if (lessonDatabase[node.id]) {
        setActiveLessonId(node.id);
        setCurrentQuizIndex(0);
        setSelectedAnswer(null);
        setIsLessonComplete(false);
      } else {
        Alert.alert("Coming Soon", "This lesson is under construction.");
      }
    } else {
      Alert.alert("Locked", "You must master the prerequisite techniques first.");
    }
  };

  const handleQuizAnswer = (optionId: string, correctId: string, lessonId: string) => {
    setSelectedAnswer(optionId);
    if (optionId === correctId) {
      const lesson = lessonDatabase[lessonId];
      // Check if it's a new multi-question array or an old single question
      const totalQuestions = Array.isArray(lesson.quiz) ? lesson.quiz.length : 1;
      
      if (currentQuizIndex < totalQuestions - 1) {
        // Automatically move to the next question after a 1-second delay
        setTimeout(() => {
          setCurrentQuizIndex(currentQuizIndex + 1);
          setSelectedAnswer(null);
        }, 1000);
      } else {
        // Lesson Mastered
        setIsLessonComplete(true);
        if (!completedNodes.includes(lessonId)) {
          setCompletedNodes([...completedNodes, lessonId]);
        }
      }
    } else {
      Alert.alert("Not Quite", "Review the theory and try again.");
    }
  };

  // --- VIEW 1: THE LESSON SCREEN ---
  if (activeLessonId && lessonDatabase[activeLessonId]) {
    const lesson = lessonDatabase[activeLessonId];
    
    // Safely load the current question whether it's an array or single object
    const currentQuizObj = Array.isArray(lesson.quiz) ? lesson.quiz[currentQuizIndex] : lesson.quiz;

    return (
      <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1642112177610-c1ff271857dd?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveLessonId(null)}>
          <Text style={styles.backButtonText}>← Back to Skill Tree</Text>
        </TouchableOpacity>
        
        <ScrollView contentContainerStyle={styles.lessonContainer}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          
          {lesson.slides.map((slide: any) => (
            <View key={slide.id} style={styles.slideCard}>
              {slide.type === 'image' ? (
                <Image source={{ uri: slide.url }} style={styles.slideImage} resizeMode="cover" />
              ) : (
                <>
                  <Text style={styles.slideType}>{slide.type.toUpperCase()}</Text>
                  <Text style={styles.slideContent}>{slide.content}</Text>
                </>
              )}
            </View>
          ))}

          <View style={styles.quizContainer}>
            <Text style={styles.quizQuestion}>{currentQuizObj.question}</Text>
            {currentQuizObj.options.map((opt: any) => (
              <TouchableOpacity 
                key={opt.id}
                style={[
                  styles.quizOption, 
                  selectedAnswer === opt.id && (opt.id === currentQuizObj.correctId ? styles.quizCorrect : styles.quizWrong)
                ]}
                onPress={() => handleQuizAnswer(opt.id, currentQuizObj.correctId, activeLessonId)}
                disabled={isLessonComplete}
              >
                <Text style={styles.quizOptionText}>{opt.text}</Text>
              </TouchableOpacity>
            ))}

            {isLessonComplete && (
              <TouchableOpacity style={styles.successButton} onPress={() => setActiveLessonId(null)}>
                <Text style={styles.successButtonText}>Lesson Complete: Return to Map</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  // --- VIEW 2: THE SKILL TREE ---
  return (
    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1642112177610-c1ff271857dd?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} style={styles.container}>
      <Text style={styles.header}>Cooking Chemistry</Text>
      <ScrollView contentContainerStyle={styles.treeContainer}>
        {skillTreeData.nodes.map((node: any) => {
          const isCompleted = completedNodes.includes(node.id);
          const hasPrereqs = node.prerequisites.every((prereq: any) => completedNodes.includes(prereq));
          
          return (
            <TouchableOpacity 
              key={node.id} 
              style={[
                styles.nodeCard, 
                isCompleted ? styles.completedCard : (hasPrereqs ? styles.unlockedCard : styles.lockedCard)
              ]}
              onPress={() => handleNodePress(node)}
            >
              <Text style={styles.nodeTitle}>{node.title}</Text>
              <Text style={styles.nodeType}>{node.type.toUpperCase()}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

// 4. The Visual Styles
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  
  // Tree Styles
  treeContainer: { padding: 20, alignItems: 'center', width: '100%' },
  nodeCard: { width: '100%', padding: 20, borderRadius: 12, marginBottom: 15, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  completedCard: { backgroundColor: '#d4edda', borderColor: '#28a745', borderWidth: 2 },
  unlockedCard: { backgroundColor: '#fff', borderColor: '#007bff', borderWidth: 2 },
  lockedCard: { backgroundColor: '#e9ecef', opacity: 0.6 },
  nodeTitle: { fontSize: 18, fontWeight: '600' },
  nodeType: { fontSize: 12, color: '#666', marginTop: 5 },
  
  // Lesson Styles
  backButton: { padding: 15, backgroundColor: '#333', marginHorizontal: 20, borderRadius: 8, marginBottom: 10 },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
  lessonContainer: { padding: 20 },
  lessonTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  slideCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  slideType: { fontSize: 12, fontWeight: 'bold', color: '#007bff', marginBottom: 8 },
  slideContent: { fontSize: 16, lineHeight: 24, color: '#444' },
  
  // New Image Style
  slideImage: { width: '100%', height: 200, borderRadius: 8, backgroundColor: '#eee' },
  
  // Quiz Styles
  quizContainer: { marginTop: 20, padding: 20, backgroundColor: '#eef2f5', borderRadius: 12 },
  quizQuestion: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  quizOption: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  quizOptionText: { fontSize: 16 },
  quizCorrect: { backgroundColor: '#d4edda', borderColor: '#28a745', borderWidth: 2 },
  quizWrong: { backgroundColor: '#f8d7da', borderColor: '#dc3545', borderWidth: 2 },
  
  // New Styles
  successButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  successButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});