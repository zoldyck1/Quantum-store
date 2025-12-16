import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { setAuth } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../store';
import {
    ArrowLeft,
    User,
    ShoppingBag,
    Heart,
    Settings,
    Shield,
    CreditCard,
    Star,
    Edit3,
    Save,
    X,
    Calendar,
    LucideIcon
} from 'lucide-react';

interface EditForm {
    nickname: string;
    bio: string;
    avatar_url: string;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, profile, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<EditForm>({
        nickname: '',
        bio: '',
        avatar_url: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setEditForm({
                nickname: profile.nickname || '',
                bio: profile.bio || '',
                avatar_url: profile.avatar_url || ''
            });
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            await authService.setProfile(editForm);
            setIsEditing(false);
            // Refresh user data
            const { data } = await authService.getCurrentUser();
            if (data) {
                dispatch(setAuth(data));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setLoading(false);
    };

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = 'blue' }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${color}-100`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const ProfileTab: React.FC = () => (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                    >
                        <Edit3 className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-medium text-gray-700">
                                    {profile?.nickname?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.nickname}
                                        onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        value={editForm.bio}
                                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editForm.avatar_url}
                                        onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {profile?.nickname || 'Unknown User'}
                                    </h3>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                                {profile?.bio && (
                                    <p className="text-gray-700">{profile.bio}</p>
                                )}
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Orders"
                    value="12"
                    icon={ShoppingBag}
                    color="blue"
                />
                <StatCard
                    title="Wishlist Items"
                    value="5"
                    icon={Heart}
                    color="red"
                />
                <StatCard
                    title="Reviews Written"
                    value="8"
                    icon={Star}
                    color="yellow"
                />
            </div>
        </div>
    );

    const OrdersTab: React.FC = () => (
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Order History</h3>
            </div>
            <div className="p-6">
                <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    );

    const SettingsTab: React.FC = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive updates about your orders</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                            <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-900">Change Password</h4>
                                <p className="text-sm text-gray-600">Update your password</p>
                            </div>
                        </div>
                    </button>
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-900">Payment Methods</h4>
                                <p className="text-sm text-gray-600">Manage your payment information</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    if (!isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                <p className="mt-2 text-gray-600">Manage your profile and account settings</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                        >
                            <tab.icon className="h-4 w-4 mr-2" />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'orders' && <OrdersTab />}
                {activeTab === 'settings' && <SettingsTab />}
            </div>
        </div>
    );
};

export default Profile;
