const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
      } else {
        window.location.href = '/login'; // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setProfileData(userDoc.data());
      } else {
        console.error('No user data found!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="container py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="dashboard-sidebar">
              <div className="profile-image-container">
                <img 
                  src={profileData?.profileImage || '/default-avatar.png'} 
                  alt="Profile" 
                  className="profile-image"
                />
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Films Watched</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Reviews</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Watchlist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="dashboard-content">
              <div className="content-header">
                <h2>Welcome, {profileData?.fullName || 'User'}!</h2>
              </div>
              <div className="profile-form">
                <p>Email: {profileData?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;