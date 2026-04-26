<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

//! we write the permisions at the seeding file to avoid re-declare it if we freshed the DB
class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     */
    public function run(): void
    {
        //& Reset cached roles and permissions, because of Spatie stores your permissions in the Cache to keep the app fast
        app()[PermissionRegistrar::class]->forgetCachedPermissions(); //? explain me that syntax + what is the app() and from where it comes

        //& create permissions
        $permissions = [
            'view properties', 'create properties', 'edit properties', 'delete properties',
            'approve properties', 'manage users', 'view analytics'
        ];
        
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]); 
        }

        //& create roles and assign existing permissions
        $adminRole = Role::create(['name' => 'admin']);
        $brokerRole = Role::create(['name' => 'broker']);
        $customerRole = Role::create(['name' => 'customer']);
        //& Assign permissions
        $adminRole->givePermissionTo(Permission::all()); //? how can I assign these roles to the models (user model)
        $brokerRole->givePermissionTo(['view properties', 'create properties', 'edit properties']);
        $customerRole->givePermissionTo(['view properties']); 
    }
}