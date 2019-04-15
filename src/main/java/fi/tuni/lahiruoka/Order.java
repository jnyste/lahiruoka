package fi.tuni.lahiruoka;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

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
    LocalTime timeOfDelivery;

    @Column(nullable = false)
    boolean confirmedByOrderer;

    @Column(nullable = false)
    boolean acceptedByFarmer;

    @Column(nullable = false)
    boolean declinedByFarmer;

    public Order() {
        this.dateOfOrder = LocalDate.now();
        this.confirmedByOrderer = false;
        this.acceptedByFarmer = false;
        this.declinedByFarmer = false;
    }

    public Order(User orderer, Product product, double amount, LocalDate dateOfDelivery, LocalTime timeOfDelivery) {
        this.orderer = orderer;
        this.product = product;
        this.amount = amount;
        this.dateOfDelivery = dateOfDelivery;
        this.timeOfDelivery = timeOfDelivery;
        this.dateOfOrder = LocalDate.now();
        this.confirmedByOrderer = false;
        this.acceptedByFarmer = false;
        this.declinedByFarmer = false;
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

    public LocalTime getTimeOfDelivery() {
        return timeOfDelivery;
    }

    public void setTimeOfDelivery(LocalTime timeOfDelivery) {
        this.timeOfDelivery = timeOfDelivery;
    }

    public int getOrderId() {
        return orderId;
    }

    public LocalDate getDateOfOrder() {
        return dateOfOrder;
    }

    public boolean isConfirmedByOrderer() {
        return confirmedByOrderer;
    }

    public void setConfirmedByOrderer(boolean confirmed) {
        this.confirmedByOrderer = confirmed;
    }

    public boolean isAcceptedByFarmer() {
        return acceptedByFarmer;
    }

    public void setAcceptedByFarmer(boolean acceptedByFarmer) {
        this.acceptedByFarmer = acceptedByFarmer;
    }

    public boolean isDeclinedByFarmer() {
        return declinedByFarmer;
    }

    public void setDeclinedByFarmer(boolean declinedByFarmer) {
        this.declinedByFarmer = declinedByFarmer;
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
                ", timeOfDelivery=" + timeOfDelivery +
                ", confirmedByOrderer=" + confirmedByOrderer +
                ", acceptedByFarmer=" + acceptedByFarmer +
                ", declinedByFarmer=" + declinedByFarmer +
                '}';
    }
}
