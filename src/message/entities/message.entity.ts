import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Agrega esta línea
  timestamp: Date; // Define la columna de marca de tiempo


  @Column()
  senderId: number; // Nueva propiedad senderId

  @Column()
  receiverId: number; // Nueva propiedad receiverId

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'senderId' })
  sender: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'receiverId' })
  receiver: Usuario;
}
