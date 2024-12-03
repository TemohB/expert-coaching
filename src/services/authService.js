// Simulation d'un service d'authentification
const MOCK_USERS = [
    {
        id: 1,
        email: 'coach@example.com',
        password: 'Coach123!',
        role: 'coach',
        profile: {
            name: 'Sarah Martin',
            specialty: 'Développement Personnel',
            bio: 'Coach expérimentée avec 10 ans de pratique'
        }
    },
    {
        id: 2,
        email: 'client@example.com',
        password: 'Client123!',
        role: 'client',
        profile: {
            name: 'Jean Dupont',
            goals: ['Développement de carrière', 'Gestion du stress']
        }
    }
];

// Simuler un délai de réponse serveur
const simulateServerDelay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const authService = {
    // Inscription
    register: async (userData) => {
        await simulateServerDelay();
        
        // Vérifier si l'email existe déjà
        const existingUser = MOCK_USERS.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Cet email est déjà utilisé');
        }

        // Créer un nouvel utilisateur
        const newUser = {
            id: MOCK_USERS.length + 1,
            email: userData.email,
            password: userData.password, // En réalité, on hasherait le mot de passe
            role: userData.role || 'client',
            profile: {
                name: userData.name
            }
        };

        MOCK_USERS.push(newUser);
        
        // Retourner les informations de l'utilisateur sans le mot de passe
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    // Connexion
    login: async (credentials) => {
        await simulateServerDelay();
        
        const user = MOCK_USERS.find(
            u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        // Générer un token JWT simulé
        const token = btoa(JSON.stringify({
            userId: user.id,
            email: user.email,
            role: user.role,
            exp: Date.now() + 24 * 60 * 60 * 1000 // Valide 24h
        }));

        // Retourner les informations de l'utilisateur et le token
        const { password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    },

    // Récupération du profil utilisateur
    getUserProfile: async (token) => {
        await simulateServerDelay(500);
        
        try {
            const decodedToken = JSON.parse(atob(token));
            const user = MOCK_USERS.find(u => u.id === decodedToken.userId);

            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            const { password, ...profile } = user;
            return profile;
        } catch (error) {
            throw new Error('Token invalide');
        }
    },

    // Récupérer les coachs disponibles
    getAvailableCoaches: async () => {
        await simulateServerDelay(800);
        
        return MOCK_USERS
            .filter(user => user.role === 'coach')
            .map(coach => ({
                id: coach.id,
                name: coach.profile.name,
                specialty: coach.profile.specialty,
                bio: coach.profile.bio
            }));
    }
};