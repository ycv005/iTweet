from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission for the Owner
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom persmission for the Owner else read only
    """

    def has_object_permission(self, request, view, obj):
        if request.methods in permissions.SAFE_METHODS:
            return True
        return request.user == obj.user
