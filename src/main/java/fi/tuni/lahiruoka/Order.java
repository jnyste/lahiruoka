package fi.tuni.lahiruoka;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="order_table")
public class Order {
    @Id
    @GeneratedValue(generator="order_seq")
    @SequenceGenerator(name="order_seq", sequenceName = "ORDER_SEQ", allocationSize = 1)
    int orderId;

    @ManyToOne
    @JoinColumn
    User orderer;

    @ManyToOne
    @JoinColumn
    Product product;

    @Column(nullable = false)
    double amount;

    @Column(nullable = false)
    LocalDate dateOfOrder;

    @Column(nullable = false)
    LocalDate dateOfDelivery;

    @Column(nullable = false)
    boolean confirmed;

    public Order() {
        this.dateOfOrder = LocalDate.now();
    }

    public Order(User orderer, Product product, double amount, LocalDate dateOfDelivery) {
        this.orderer = orderer;
        this.product = product;
        this.amount = amount;
        this.dateOfDelivery = dateOfDelivery;
        this.dateOfOrder = LocalDate.now();
        this.confirmed = false;
    }

    public User getOrderer() {
        return orderer;
    }

    public void setOrderer(User orderer) {
        this.orderer = orderer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDateOfDelivery() {
        return dateOfDelivery;
    }

    public void setDateOfDelivery(LocalDate dateOfDelivery) {
        this.dateOfDelivery = dateOfDelivery;
    }

    public int getOrderId() {
        return orderId;
    }

    public LocalDate getDateOfOrder() {
        return dateOfOrder;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", orderer=" + orderer +
                ", product=" + product +
                ", amount=" + amount +
                ", dateOfOrder=" + dateOfOrder +
                ", dateOfDelivery=" + dateOfDelivery +
                '}';
    }
}
