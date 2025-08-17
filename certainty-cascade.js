/**
 * COUNTERTYPE SCORING ENGINE
 * 
 * Measures contributor resilience across adversarial cognitive patterns.
 * Tracks pattern recognition, escape elegance, meta-awareness, and synthesis skill.
 * 
 * CORE METRICS:
 * - Recognition Speed: How quickly patterns are detected
 * - Escape Elegance: Synthesis vs brute force approaches  
 * - Meta-Awareness: Understanding the trap's purpose
 * - Pattern Immunity: Resistance to repeated pattern types
 * - Synthesis Mastery: Transcending binary thinking
 */

class ScoringEngine {
  constructor(config = {}) {
    this.baselineTime = config.baselineTime || 60000; // 60 seconds
    this.eleganceThreshold = config.eleganceThreshold || 0.7;
    this.masteryThreshold = config.masteryThreshold || 151;
    this.contributorProfiles = new Map();
  }

  /**
   * Score a contributor's escape attempt
   */
  scoreEscape(contributorId, escapeAttempt) {
    const profile = this.getOrCreateProfile(contributorId);
    const score = this.calculateEscapeScore(escapeAttempt, profile);
    
    // Update contributor profile
    this.updateProfile(contributorId, escapeAttempt, score);
    
    // Check for level advancement
    const advancement = this.checkAdvancement(contributorId);
    
    return {
      ...score,
      contributor: contributorId,
      advancement,
      totalResilience: profile.totalResilience + score.resilience,
      timestamp: Date.now()
    };
  }

  /**
   * Calculate detailed escape score
   */
  calculateEscapeScore(attempt, profile) {
    const scores = {
      recognition: this.scoreRecognition(attempt, profile),
      velocity: this.scoreVelocity(attempt),
      elegance: this.scoreElegance(attempt),
      metaAwareness: this.scoreMetaAwareness(attempt),
      synthesis: this.scoreSynthesis(attempt),
      immunity: this.scoreImmunity(attempt, profile)
    };

    // Base resilience calculation
    const baseResilience = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    // Multipliers for advanced patterns
    const complexityMultiplier = this.getComplexityMultiplier(attempt.pattern);
    const streakBonus = this.getStreakBonus(profile);
    
    const totalResilience = Math.round(baseResilience * complexityMultiplier * streakBonus);

    return {
      ...scores,
      baseResilience,
      complexityMultiplier,
      streakBonus,
      resilience: totalResilience,
      breakdown: this.generateScoreBreakdown(scores, attempt)
    };
  }

  /**
   * Score pattern recognition ability
   */
  scoreRecognition(attempt, profile) {
    if (!attempt.patternRecognized) return 0;
    
    // Base recognition points
    let points = 5;
    
    // Bonus for first-time pattern recognition
    if (!profile.recognizedPatterns.has(attempt.pattern)) {
      points += 3;
    }
    
    // Bonus for subtle pattern detection
    if (attempt.patternSubtlety > 0.7) {
      points += 2;
    }
    
    return points;
  }

  /**
   * Score escape velocity (speed of cognitive pivot)
   */
  scoreVelocity(attempt) {
    if (!attempt.escapeTime) return 1;
    
    // Logarithmic scoring - faster escapes worth more
    const timeRatio = this.baselineTime / attempt.escapeTime;
    const velocityScore = Math.min(10, Math.log2(timeRatio + 1) * 2);
    
    return Math.round(velocityScore);
  }

  /**
   * Score elegance of escape method
   */
  scoreElegance(attempt) {
    let elegance = 0;
    
    // Synthesis over brute force
    if (attempt.escapeMethod === 'synthesis') {
      elegance += 3;
    } else if (attempt.escapeMethod === 'recognition') {
      elegance += 1;
    }
    
    // Bonus for creative solutions
    if (attempt.creativity && attempt.creativity > this.eleganceThreshold) {
      elegance += 2;
    }
    
    // Penalty for inelegant approaches
    if (attempt.bruteForce) {
      elegance -= 1;
    }
    
    return Math.max(0, elegance);
  }

  /**
   * Score meta-cognitive awareness
   */
  scoreMetaAwareness(attempt) {
    if (!attempt.metaAwareness) return 0;
    
    let awareness = 7; // Base meta-awareness points
    
    // Bonus for understanding trap purpose
    if (attempt.understoodPurpose) {
      awareness += 3;
    }
    
    // Bonus for reflecting on own cognitive process
    if (attempt.selfReflection) {
      awareness += 2;
    }
    
    // Bonus for teaching others
    if (attempt.teachingMoment) {
      awareness += 5;
    }
    
    return awareness;
  }

  /**
   * Score synthesis transcendence
   */
  scoreSynthesis(attempt) {
    if (!attempt.synthesized) return 0;
    
    let synthesis = 4; // Base synthesis points
    
    // Different types of synthesis
    if (attempt.synthesisType === 'dialectical') {
      synthesis += 3; // Thesis + antithesis = synthesis
    } else if (attempt.synthesisType === 'paradoxical') {
      synthesis += 5; // Embracing contradictions
    } else if (attempt.synthesisType === 'emergent') {
      synthesis += 7; // Creating new frameworks
    }
    
    return synthesis;
  }

  /**
   * Score pattern immunity (resistance to repeated exposure)
   */
  scoreImmunity(attempt, profile) {
    const exposureCount = profile.patternExposures.get(attempt.pattern) || 0;
    
    if (exposureCount === 0) return 0; // First exposure, no immunity yet
    
    // Diminishing returns for escaping same pattern
    if (attempt.escaped) {
      const immunityScore = Math.max(1, 5 - exposureCount);
      return immunityScore;
    }
    
    // Penalty for falling into known traps
    return -2;
  }

  /**
   * Get complexity multiplier based on pattern difficulty
   */
  getComplexityMultiplier(pattern) {
    const complexityMap = {
      'binary_trap': 1.0,
      'certainty_cascade': 1.2,
      'tautology_loop': 1.4,
      'meta_trap': 1.8,
      'recursive_synthesis_trap': 2.0
    };
    
    return complexityMap[pattern] || 1.0;
  }

  /**
   * Get streak bonus for consecutive successes
   */
  getStreakBonus(profile) {
    const streak = profile.currentStreak || 0;
    
    if (streak >= 10) return 1.5;
    if (streak >= 5) return 1.3;
    if (streak >= 3) return 1.1;
    
    return 1.0;
  }

  /**
   * Get or create contributor profile
   */
  getOrCreateProfile(contributorId) {
    if (!this.contributorProfiles.has(contributorId)) {
      this.contributorProfiles.set(contributorId, {
        id: contributorId,
        totalResilience: 0,
        level: 'apprentice',
        recognizedPatterns: new Set(),
        patternExposures: new Map(),
        escapeHistory: [],
        currentStreak: 0,
        longestStreak: 0,
        specializations: new Set(),
        achievements: new Set(),
        createdAt: Date.now()
      });
    }
    
    return this.contributorProfiles.get(contributorId);
  }

  /**
   * Update contributor profile after scoring
   */
  updateProfile(contributorId, attempt, score) {
    const profile = this.contributorProfiles.get(contributorId);
    
    // Update totals
    profile.totalResilience += score.resilience;
    
    // Track pattern exposure
    const currentExposures = profile.patternExposures.get(attempt.pattern) || 0;
    profile.patternExposures.set(attempt.pattern, currentExposures + 1);
    
    // Track pattern recognition
    if (attempt.patternRecognized) {
      profile.recognizedPatterns.add(attempt.pattern);
    }
    
    // Update streaks
    if (attempt.escaped) {
      profile.currentStreak = (profile.currentStreak || 0) + 1;
      profile.longestStreak = Math.max(profile.longestStreak || 0, profile.currentStreak);
    } else {
      profile.currentStreak = 0;
    }
    
    // Track escape history (keep last 20)
    profile.escapeHistory.push({
      pattern: attempt.pattern,
      escaped: attempt.escaped,
      resilience: score.resilience,
      timestamp: Date.now()
    });
    
    if (profile.escapeHistory.length > 20) {
      profile.escapeHistory.shift();
    }
    
    // Check for specializations
    this.updateSpecializations(profile, attempt, score);
    
    // Check for achievements
    this.updateAchievements(profile, attempt, score);
  }

  /**
   * Check for contributor advancement
   */
  checkAdvancement(contributorId) {
    const profile = this.contributorProfiles.get(contributorId);
    const currentLevel = profile.level;
    const newLevel = this.calculateLevel(profile.totalResilience);
    
    if (newLevel !== currentLevel) {
      profile.level = newLevel;
      return {
        advanced: true,
        from: currentLevel,
        to: newLevel,
        unlockedAffordances: this.getUnlockedAffordances(newLevel)
      };
    }
    
    return { advanced: false };
  }

  /**
   * Calculate contributor level based on total resilience
   */
  calculateLevel(totalResilience) {
    if (totalResilience >= 151) return 'master';
    if (totalResilience >= 76) return 'artisan';
    if (totalResilience >= 26) return 'journeyman';
    return 'apprentice';
  }

  /**
   * Get unlocked affordances for level
   */
  getUnlockedAffordances(level) {
    const affordanceMap = {
      'journeyman': ['custom_pattern_creation', 'peer_training_mode'],
      'artisan': ['pattern_composition', 'advanced_synthesis_challenges'],
      'master': ['meta_pattern_design', 'community_leadership', 'protocol_contribution']
    };
    
    return affordanceMap[level] || [];
  }

  /**
   * Update contributor specializations
   */
  updateSpecializations(profile, attempt, score) {
    // Synthesis specialization
    if (score.synthesis >= 7 && attempt.synthesisType === 'emergent') {
      profile.specializations.add('synthesis_master');
    }
    
    // Speed specialization
    if (score.velocity >= 8) {
      profile.specializations.add('velocity_demon');
    }
    
    // Pattern hunting specialization
    if (score.recognition >= 8 && attempt.patternSubtlety > 0.8) {
      profile.specializations.add('pattern_hunter');
    }
    
    // Meta-cognitive specialization
    if (score.metaAwareness >= 15) {
      profile.specializations.add('meta_master');
    }
  }

  /**
   * Update achievements
   */
  updateAchievements(profile, attempt, score) {
    // First escape
    if (attempt.escaped && profile.escapeHistory.length === 1) {
      profile.achievements.add('first_escape');
    }
    
    // Perfect streak
    if (profile.currentStreak === 10) {
      profile.achievements.add('perfect_ten');
    }
    
    // Pattern collector
    if (profile.recognizedPatterns.size >= 5) {
      profile.achievements.add('pattern_collector');
    }
    
    // Teaching moment
    if (attempt.teachingMoment) {
      profile.achievements.add('teacher');
    }
    
    // Speed demon
    if (score.velocity === 10) {
      profile.achievements.add('lightning_escape');
    }
  }

  /**
   * Generate human-readable score breakdown
   */
  generateScoreBreakdown(scores, attempt) {
    const breakdown = [];
    
    if (scores.recognition > 0) {
      breakdown.push(`🎯 Pattern Recognition: +${scores.recognition} pts`);
    }
    
    if (scores.velocity > 0) {
      breakdown.push(`⚡ Escape Velocity: +${scores.velocity} pts`);
    }
    
    if (scores.elegance > 0) {
      breakdown.push(`✨ Method Elegance: +${scores.elegance} pts`);
    }
    
    if (scores.metaAwareness > 0) {
      breakdown.push(`🧠 Meta-Awareness: +${scores.metaAwareness} pts`);
    }
    
    if (scores.synthesis > 0) {
      breakdown.push(`🌊 Synthesis: +${scores.synthesis} pts`);
    }
    
    if (scores.immunity > 0) {
      breakdown.push(`🛡️ Pattern Immunity: +${scores.immunity} pts`);
    }
    
    return breakdown;
  }

  /**
   * Get contributor leaderboard
   */
  getLeaderboard(limit = 10) {
    return Array.from(this.contributorProfiles.values())
      .sort((a, b) => b.totalResilience - a.totalResilience)
      .slice(0, limit)
      .map(profile => ({
        id: profile.id,
        resilience: profile.totalResilience,
        level: profile.level,
        currentStreak: profile.currentStreak,
        specializations: Array.from(profile.specializations),
        achievements: Array.from(profile.achievements)
      }));
  }

  /**
   * Export contributor profile for persistence
   */
  exportProfile(contributorId) {
    const profile = this.contributorProfiles.get(contributorId);
    if (!profile) return null;
    
    return {
      ...profile,
      recognizedPatterns: Array.from(profile.recognizedPatterns),
      patternExposures: Object.fromEntries(profile.patternExposures),
      specializations: Array.from(profile.specializations),
      achievements: Array.from(profile.achievements)
    };
  }

  /**
   * Import contributor profile from persistence
   */
  importProfile(profileData) {
    const profile = {
      ...profileData,
      recognizedPatterns: new Set(profileData.recognizedPatterns),
      patternExposures: new Map(Object.entries(profileData.patternExposures)),
      specializations: new Set(profileData.specializations),
      achievements: new Set(profileData.achievements)
    };
    
    this.contributorProfiles.set(profile.id, profile);
  }
}

/**
 * Factory function for scoring engine
 */
export function createScoringEngine(config = {}) {
  return new ScoringEngine(config);
}

/**
 * Default scoring engine instance
 */
export const defaultScoringEngine = new ScoringEngine();

export default ScoringEngine;
