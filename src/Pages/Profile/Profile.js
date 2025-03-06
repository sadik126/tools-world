import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Authcontext } from '../../Context/Authprovider';
import Loading from '../../Shared/Loading/Loading';
import Axiospublic from '../Axiospublic/Axiospublic';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, loading } = useContext(Authcontext);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false); // ✅ Loading State for Uploading

    const imgStorageKey = 'e0e49e32b3b219f54116af3c0da0de50';
    const imageurl = `https://api.imgbb.com/1/upload?&key=${imgStorageKey}`;

    const axiospublic = Axiospublic();
    // const axiossecuredata = Useaxiossecure();

    // ✅ **Fetching User Data**
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiospublic.get(`/user?email=${user?.email}`);
            return res.data;
        }
    });

    // ✅ **Mutation for Profile Update**
    const updateProfileMutation = useMutation({
        mutationFn: async (profile) => {
            return await axiospublic.patch(`/profile/${users[0]?.email}`, profile);
        },
        onSuccess: () => {
            setUploading(false); // 🔴 Stop Loading
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Profile Updated Successfully!`,
                showConfirmButton: false,
                timer: 1500,
            });
            setIsEditing(false);
            refetch(); // 🔄 **React Query Cache Refresh**
        }
    });

    if (loading || isLoading) {
        return <Loading />;
    }

    const handleEdit = () => {
        setIsEditing(true);
        setNewName(users[0]?.name || '');
    };

    const handleSave = async () => {
        setUploading(true); // 🟢 Start Loading
        let updatedImage = users[0]?.image;

        if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const res = await axiospublic.post(imageurl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                updatedImage = res.data.data.display_url;
            }
        }

        // ✅ **Update Profile Mutation Call**
        updateProfileMutation.mutate({
            name: newName,
            image: updatedImage
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className='max-w-2xl mx-auto p-6 shadow-md rounded-lg'>
            <h1 className='text-3xl font-bold text-center text-primary'>Profile</h1>
            <div className='flex items-center space-x-6 mt-6'>
                <div className='avatar'>
                    <div className='w-24 h-24 rounded-full border-4 border-orange-500 overflow-hidden'>
                        <img src={selectedImage ? URL.createObjectURL(selectedImage) : users[0]?.image} alt='Profile' />
                    </div>
                </div>
                {isEditing && (
                    <input type='file' onChange={handleImageChange} className='file-input file-input-bordered w-full max-w-xs' />
                )}
            </div>

            <div className='mt-6'>
                <label className='block font-medium'>Name:</label>
                {isEditing ? (
                    <input
                        type='text'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className='input input-bordered w-full mt-2'
                    />
                ) : (
                    <p className='text-lg font-semibold text-orange-700'>{users[0]?.name}</p>
                )}
            </div>

            <div className='mt-4'>
                <label className='block font-medium'>Email:</label>
                <p className='text-lg font-semibold text-orange-700'>{users[0]?.email}</p>
            </div>

            <div className='mt-4'>
                <label className='block font-medium'>Role:</label>
                <p className='text-lg font-semibold text-orange-700'>{users[0]?.role}</p>
            </div>

            <div className='mt-6 flex justify-end'>
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className={`btn btn-success ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={uploading}
                    >
                        {uploading ? "Saving..." : "Save"}
                    </button>
                ) : (
                    <button onClick={handleEdit} className='btn btn-warning'>Edit Profile</button>
                )}
            </div>

            {/* 🔄 **Show Loading Indicator When Uploading** */}
            {uploading && (
                <div className="flex justify-center mt-4">
                    <Loading /> {/* 👈 Loading Spinner Component */}
                </div>
            )}
        </div>
    );
};

export default Profile;
