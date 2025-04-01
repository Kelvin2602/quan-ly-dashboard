
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Lock, Unlock, Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTitle, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Sample user data
const sampleUsers = [
  { id: '1', name: 'Nguyễn Văn Admin', email: 'admin@example.com', role: 'admin', active: true },
  { id: '2', name: 'Trần Thị B', email: 'tranb@example.com', role: 'customer', active: true },
  { id: '3', name: 'Lê Văn C', email: 'levanc@example.com', role: 'customer', active: true },
  { id: '4', name: 'Phạm Thị D', email: 'phamd@example.com', role: 'manager', active: true },
  { id: '5', name: 'Hoàng Văn E', email: 'hoange@example.com', role: 'customer', active: false },
];

export default function UsersTable() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const toggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: user?.active ? "Tài khoản đã bị khóa" : "Tài khoản đã được kích hoạt",
      description: `Tài khoản của ${user?.name} đã được ${user?.active ? 'khóa' : 'kích hoạt'}.`,
      variant: "default",
    });
  };

  const saveUser = (formData: any) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));
      toast({
        title: "Cập nhật thành công",
        description: `Thông tin người dùng ${formData.name} đã được cập nhật.`,
        variant: "default",
      });
    } else {
      // Add new user
      setUsers([...users, { ...formData, id: (users.length + 1).toString(), active: true }]);
      toast({
        title: "Thêm thành công",
        description: `Người dùng ${formData.name} đã được thêm vào hệ thống.`,
        variant: "default",
      });
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-1/2 -mt-2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm người dùng..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 input-focus"
          />
        </div>
        
        <Button 
          className="hover-scale"
          onClick={() => {
            setSelectedUser(null);
            setIsDialogOpen(true);
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button>
      </div>

      <div className="rounded-md border bg-white animate-fade-in overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="table-row-hover">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${user.role === 'admin' ? 'border-purple-500 text-purple-500' : ''}
                      ${user.role === 'manager' ? 'border-blue-500 text-blue-500' : ''}
                      ${user.role === 'customer' ? 'border-green-500 text-green-500' : ''}
                    `}>
                      {user.role === 'admin' && 'Admin'}
                      {user.role === 'manager' && 'Quản lý'}
                      {user.role === 'customer' && 'Khách hàng'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.active ? 'bg-green-500' : 'bg-red-500'}>
                      {user.active ? 'Hoạt động' : 'Bị khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.active ? (
                        <Lock className="h-4 w-4 text-red-500" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Không tìm thấy người dùng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </DialogTitle>
          </DialogHeader>
          <UserForm user={selectedUser} onSave={saveUser} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface UserFormProps {
  user?: any;
  onSave: (formData: any) => void;
}

function UserForm({ user, onSave }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || 'customer');
  const [active, setActive] = useState(user?.active !== undefined ? user.active : true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role, active });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Tên người dùng</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-focus"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-focus"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Vai trò</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role" className="input-focus">
            <SelectValue placeholder="Chọn vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Quản lý</SelectItem>
            <SelectItem value="customer">Khách hàng</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {user && (
        <div className="flex items-center space-x-2">
          <Switch 
            id="active" 
            checked={active} 
            onCheckedChange={setActive} 
          />
          <Label htmlFor="active">Kích hoạt tài khoản</Label>
        </div>
      )}
      
      <div className="flex justify-end pt-4">
        <Button type="submit">
          {user ? 'Cập nhật' : 'Thêm người dùng'}
        </Button>
      </div>
    </form>
  );
}
