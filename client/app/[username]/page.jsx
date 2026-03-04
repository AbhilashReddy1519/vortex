"use client";
import React from "react";
import {useParams} from 'next/navigation';

function UserProfile() {
  const params = useParams();
  const slug = params.username;
	return <div>
    {slug}
  </div>;
}

export default UserProfile;
